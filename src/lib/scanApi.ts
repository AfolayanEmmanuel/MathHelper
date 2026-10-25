import Constants from 'expo-constants';
import { Platform } from 'react-native';

import type { ScanRequest, ScanResult } from './scanTypes';

/**
 * Where the /api routes live.
 * - Web: same origin as the page, so a relative URL works.
 * - Native in development: the Expo dev server (same host Metro is served from).
 * - Native in production: EXPO_PUBLIC_API_URL (the URL of your deployed server). This is not a secret.
 */
function apiBaseUrl(): string {
  if (process.env.EXPO_PUBLIC_API_URL) return process.env.EXPO_PUBLIC_API_URL.replace(/\/$/, '');
  if (Platform.OS === 'web') return '';
  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) return `http://${hostUri}`;
  throw new Error('API server not configured. Set EXPO_PUBLIC_API_URL in your .env file.');
}

export async function scanHomework(request: ScanRequest, signal?: AbortSignal): Promise<ScanResult> {
  let res: Response;
  try {
    res = await fetch(`${apiBaseUrl()}/api/scan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
      signal,
    });
  } catch (e) {
    if (e instanceof Error && e.name === 'AbortError') throw e;
    throw new Error('Could not reach the Math Helper server. Check your internet connection and try again.');
  }

  if (res.status === 413) throw new Error('This photo is too large to upload. Try cropping it closer to the question.');
  const isJson = res.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await res.json().catch(() => null) : null;
  if (!res.ok) throw new Error(data?.error ?? `Request failed (${res.status})`);
  if (!isJson || !isScanResult(data)) {
    // e.g. a dev server started before the API route existed returns the HTML page instead.
    throw new Error('The scan service did not respond correctly. Restart the dev server with "npx expo start -c" and try again.');
  }
  return data;
}

function isScanResult(data: unknown): data is ScanResult {
  return !!data && typeof data === 'object' && Array.isArray((data as ScanResult).problems);
}
