import { IssueState } from "../__generated__/graphql";
import { Author } from "./Author";

export type Issue = {
  id: string;
  title: string;
  number: number;
  body: string;
  createdAt: Date;
  state: IssueState;
  author?: Author;
};
