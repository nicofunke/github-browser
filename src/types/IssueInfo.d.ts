import { Author } from "./Author";
import { IssueState } from "./IssueState";

export type IssueInfo = {
  issueNumber: number;
  state: IssueState;
  title: string;
  author?: Author;
  createdAt: Date;
  cursor?: string;
};
