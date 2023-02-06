import { Card, CardContent, LinearProgress, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import { Navigate } from "react-router-dom";
import IssueStateChip from "../../shared/IssueStateChip";
import useIssue from "./useIssue";

/**
 * Loads and displays the issues main information
 */
export default function IssueMainInformation({
  issueNumber,
}: {
  issueNumber: number;
}) {
  const { loading, error, data: issue } = useIssue(issueNumber);
  if (loading) return <LinearProgress />;
  if (error || !issue) return <Navigate replace to="/" />;

  return (
    <Card sx={{ marginBottom: "2rem" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {issue.createdAt.toLocaleDateString("en-US")} (#{issue.number}){" "}
          <IssueStateChip state={issue.state} />
        </Typography>
        <Typography variant="h5" component="div">
          {issue.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {issue.author?.login || "Deleted User"}
        </Typography>
        <Typography variant="body2">
          <ReactMarkdown>{issue.body}</ReactMarkdown>
        </Typography>
      </CardContent>
    </Card>
  );
}
