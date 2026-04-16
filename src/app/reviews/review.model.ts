export interface Review {
  id: string;
  userId: string;
  username: string;
  score: number;
  body: string;
  isEdited: boolean;
  createdAt: string;
  updatedAt: string;
}
