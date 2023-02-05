import { Author } from "./Author";
import { IssueState } from "./IssueState.d";

export type Issue = {
  id: string;
  title: string;
  number: number;
  body: string;
  createdAt: Date;
  state: IssueState;
  author?: Author;
};
