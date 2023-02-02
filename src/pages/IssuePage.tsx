import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Alert,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import useIssue from "../apollo/useIssue";
import useIssueComments from "../apollo/useIssueComments";
import CommentCard from "../components/shared/CommentCard";
import IssueStateChip from "../components/shared/IssuStateChip";
import InfiniteScroll from "react-infinite-scroller";

export const issuePageUrl = (issueNumber?: number) =>
  `/issue/${issueNumber || ":issueNumber"}`;

function useIssueNumberParam() {
  let { issueNumber } = useParams();
  const parsed = parseInt(issueNumber || "");
  return parsed;
}

/**
 * Details page for a single issue
 */
export default function IssuePage() {
  const issueNumber = useIssueNumberParam();
  return (
    <Container maxWidth="md">
      <Typography color="white" sx={{ marginBottom: "1rem" }}>
        <Link to="/">
          <Stack direction="row" alignItems="center">
            <ArrowBackIosIcon color="inherit" />
            <span>Back to Search</span>
          </Stack>
        </Link>
      </Typography>
      <IssueMainInformation issueNumber={issueNumber} />
      <IssueComments issueNumber={issueNumber} />
    </Container>
  );
}

/**
 * Loads and displays the issues main information
 */
function IssueMainInformation({ issueNumber }: { issueNumber: number }) {
  const { loading, error, data: issue } = useIssue(issueNumber);
  if (loading) return <>Loading</>;
  if (error || !issue) return <>Error</>;
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

/**
 * Loads and displays the issues comments
 */
function IssueComments({ issueNumber }: { issueNumber: number }) {
  const { loading, data, error, fetchMore } = useIssueComments(issueNumber);
  if (loading) return <LinearProgress />;
  if (error || !data)
    return (
      <Alert severity="error">
        Something went wrong. Please try again later
      </Alert>
    );
  const hasMore = data.comments.length < data.totalCount;
  const loadMore = () => {
    if (!hasMore) return;
    fetchMore({
      variables: { after: data.comments[data.comments.length - 1].cursor },
    });
  };

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadMore}
      hasMore={hasMore}
      loader={<LinearProgress key="loading" />}
    >
      <Stack spacing={2}>
        {data.comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </Stack>
    </InfiniteScroll>
  );
}
