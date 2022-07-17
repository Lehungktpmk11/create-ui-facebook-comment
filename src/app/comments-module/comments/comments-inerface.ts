export interface CommentsInerface {
  id: string;
  body: string;
  username: string;
  userId: string;
  userImg: string;
  parentId: string | null;
  createdAt: string;
}
