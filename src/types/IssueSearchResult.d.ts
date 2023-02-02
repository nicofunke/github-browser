import { IssueInfo } from "./IssueInfo";

export type IssueSearchResult = {
  issues: IssueInfo[];
  issueCount: number;
};
