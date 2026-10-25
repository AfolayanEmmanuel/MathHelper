// Shared between the server route (src/app/api/scan+api.ts) and the client.

export type SolutionStep = {
  title: string;
  explanation: string;
  math: string;
};

export type SolvedProblem = {
  question: string;
  topic: string;
  answer: string;
  steps: SolutionStep[];
  check: string;
  keyConcepts: string[];
};

export type ScanResult = {
  problems: SolvedProblem[];
  notes: string;
};

export type ScanRequest = {
  imageBase64: string;
  mimeType: string;
};
