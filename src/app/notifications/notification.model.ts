export interface Notification {
  id: string;
  message: string;
  route: string;
  readAt: string | null;
  createdAt: string;
}
