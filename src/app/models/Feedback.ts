export interface Feedback {
  id?: number; // Optional, if the backend generates IDs
  name: string;
  rating: number;
  comments: string;
  submittedAt?: string; // Use string for ISO date format
}
