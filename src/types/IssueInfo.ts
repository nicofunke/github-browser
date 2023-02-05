import { IssueState } from "__generated__/graphql";
import { Author } from "./Author";

export type IssueInfo = {
  issueNumber: number;
  state: IssueState;
  title: string;
  author?: Author;
  createdAt: Date;
  cursor?: string;
};
