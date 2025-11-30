export interface AnswerMap {
  [key: number]: string;
}

export interface QuestionStatus {
  isCorrect: boolean;
  userAnswer: string;
}

export type SubmissionStatus = 'idle' | 'submitted';

export const CORRECT_ANSWERS: Record<number, string[]> = {
  1: ['fish'],
  2: ['roof', 'terrace'],
  3: ['spanish'],
  4: ['vegetarian'],
  5: ['audley', 'the audley'],
  6: ['hotel'],
  7: ['reviews', 'review'],
  8: ['local'],
  9: ['30', 'thirty'],
  10: ['average', 'medium']
};