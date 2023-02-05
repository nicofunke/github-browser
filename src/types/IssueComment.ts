import { Author } from "./Author";

export type IssueComment = {
  id: string;
  body: string;
  createdAt: Date;
  author?: Author;
  cursor: string;
};

export type IssueComments = {
  totalCount: number;
  comments: IssueComment[];
};
