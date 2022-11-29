export type APIRes = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export type Post = {
  postId: number;
  title: string;
  body: string;
};

export type User = {
  userId: number;
  post: Post;
};

export type PostByUser = {
  [index: string]: APIRes[];
};

export type State = {
  postsByUser: PostByUser | {};
  selectedUser: string;
};
