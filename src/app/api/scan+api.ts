// Server-only route: runs on the Expo dev server / your deployed server, never in the app bundle.
// The Gemini API key is read from the environment (.env) and never sent to the client.
import type { ScanRequest, ScanResult } from '../../lib/scanTypes';

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
const DEFAULT_MODEL = 'gemini-3.5-flash';
// Tried in order if the primary model is overloaded (503) or rate-limited (429).
const FALLBACK_MODELS = ['gemini-3.5-flash', 'gemini-3-flash-preview', 'gemini-flash-latest'];
const RETRYABLE = new Set([429, 500, 503]);

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const MAX_IMAGE_BYTES = 15 * 1024 * 1024;
const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

const SYSTEM_PROMPT = `You are an expert mathematics tutor with deep proficiency across arithmetic, pre-algebra, algebra, geometry, trigonometry, pre-calculus, calculus, statistics, probability and word problems.

You will receive a photo of homework. Your job:
1. Carefully read EVERY math question in the image (printed or handwritten). Transcribe each one faithfully, including all numbers, variables, units and sub-parts (a, b, c...). Treat each sub-part as its own problem.
2. Solve each problem rigorously. Work carefully, double-check arithmetic, and verify the final answer (e.g. substitute it back, check units, estimate reasonableness).
3. Explain the solution as a patient teacher would to a student: a clear sequence of small steps. Each step has a short title, a plain-language explanation of WHAT is done and WHY, and the math performed in that step.

Formatting rules (the app cannot render LaTeX):
- Write all math in plain text with Unicode symbols: ×, ÷, −, ², ³, √, π, ≤, ≥, ≠, ≈, ∫, θ, °, fractions as a/b.
- Never use LaTeX, $ delimiters, or markdown.
- "answer" is concise and final (e.g. "x = 4", "28.27 cm²", "3/4"). Include units when the question has units.
- "check" briefly shows how the answer was verified.
- "keyConcepts" lists 1–4 short names of the concepts/rules used.
- If part of the image is unreadable or ambiguous, state your best reading in "question" and mention the assumption in "notes".
- If there is no math question in the image, return an empty "problems" array and explain why in "notes".`;

const RESPONSE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['problems', 'notes'],
  properties: {
    problems: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['question', 'topic', 'answer', 'steps', 'check', 'keyConcepts'],
        properties: {
          question: { type: 'string' },
          topic: { type: 'string' },
          answer: { type: 'string' },
          steps: {
            type: 'array',
            items: {
              type: 'object',
              additionalProperties: false,
              required: ['title', 'explanation', 'math'],
              properties: {
                title: { type: 'string' },
                explanation: { type: 'string' },
                math: { type: 'string' },
              },
            },
          },
          check: { type: 'string' },
          keyConcepts: { type: 'array', items: { type: 'string' } },
        },
      },
    },
  notes: { type: 'string' },
},
} as const;

const json = (body: unknown, status = 200) => Response.json(body, { status });

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return json({ error: 'The server is missing GEMINI_API_KEY. Add it to your .env file.' }, 500);

  let body: ScanRequest;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid request body.' }, 400);
  }

  const { imageBase64, mimeType } = body ?? {};
  if (typeof imageBase64 !== 'string' || !imageBase64) return json({ error: 'No image was provided.' }, 400);
  if (!ALLOWED_MIME.has(mimeType)) return json({ error: 'Unsupported image type.' }, 400);
  if (imageBase64.length * 0.75 > MAX_IMAGE_BYTES) return json({ error: 'Image is too large. Try cropping it.' }, 413);

  const primary = process.env.GEMINI_MODEL || DEFAULT_MODEL;
  const models = [...new Set([primary, ...FALLBACK_MODELS])];
  const payload = JSON.stringify({
    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: [
      {
        role: 'user',
        parts: [
          { text: 'Read every math question in this image, solve each one, and give a full step-by-step breakdown.' },
          { inlineData: { mimeType, data: imageBase64 } },
        ],
      },
    ],
    generationConfig: { responseMimeType: 'application/json', responseJsonSchema: RESPONSE_SCHEMA },
  });

  const callModel = (model: string) =>
    fetch(`${GEMINI_URL}/${encodeURIComponent(model)}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: payload,
    });

  // Primary model gets one retry; then each fallback gets one attempt.
  const attempts = [models[0], models[0], ...models.slice(1)];
  let res: Response | null = null;
  let model = models[0];
  for (let i = 0; i < attempts.length; i++) {
    model = attempts[i];
    try {
      res = await callModel(model);
    } catch {
      return json({ error: 'Could not reach the AI service. Check your internet connection.' }, 502);
    }
    if (res.ok || !RETRYABLE.has(res.status)) break;
    console.warn(`[api/scan] ${model} returned ${res.status}, trying again`);
    if (i < attempts.length - 1) await sleep(i === 0 ? 1500 : 500);
  }
  if (!res) return json({ error: 'The AI service returned an error. Please try again.' }, 502);

  if (!res.ok) {
    const detail = await res.json().catch(() => null);
    console.error('[api/scan] Gemini error', res.status, detail?.error?.message);
    const message =
      res.status === 400 && /api key/i.test(detail?.error?.message ?? '')
        ? 'The Gemini API key is invalid.'
        : res.status === 401 || res.status === 403
          ? 'The Gemini API key is invalid or not allowed to use this model.'
          : res.status === 404
            ? `The AI model "${model}" is not available. Change GEMINI_MODEL in .env.`
            : res.status === 429
              ? 'Gemini quota or rate limit reached. Please try again shortly.'
              : res.status === 503
                ? 'The AI service is busy right now. Please try again in a moment.'
                : 'The AI service returned an error. Please try again.';
    return json({ error: message }, 502);
  }

  const data = await res.json();
  if (data?.promptFeedback?.blockReason) return json({ error: 'The AI could not process this image.' }, 422);

  const candidate = data?.candidates?.[0];
  const text: string = (candidate?.content?.parts ?? [])
    .filter((p: { text?: string; thought?: boolean }) => typeof p.text === 'string' && !p.thought)
    .map((p: { text: string }) => p.text)
    .join('');

  try {
    const result: ScanResult = JSON.parse(text);
    if (!Array.isArray(result?.problems)) throw new Error('bad shape');
    return json(result);
  } catch {
    console.error('[api/scan] Unparseable Gemini response', candidate?.finishReason);
    return json({ error: 'The AI returned an unexpected response. Please try again.' }, 502);
  }
}
