export interface Article {
  id?: number;
  title: string;
  author: string;
  content: string;
  postedAt?: Date;
  authorId: number;
  imageUrl?: string | null; // Allow string, null, or undefined
  isExpanded?: boolean; // Optional property for toggling content visibility
}
