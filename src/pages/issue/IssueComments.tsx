import {
  LinearProgress,
  Alert,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import InfiniteScroll from "react-infinite-scroller";
import ReactMarkdown from "react-markdown";
import useIssueComments from "./useIssueComments";
import UserAvatar from "../../shared/UserAvatar";
import { IssueComment } from "../../types/IssueComment";

/**
 * Loads and displays the issues comments
 */
export default function IssueComments({
  issueNumber,
}: {
  issueNumber: number;
}) {
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

/**
 * All information about an issue comment in a card
 */
function CommentCard({ comment }: { comment: IssueComment }) {
  return (
    <Card>
      <CardContent>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center">
            <UserAvatar author={comment.author} />
            <Typography sx={{ ml: "0.5rem" }}>
              {comment.author?.login || "Deleted User"}
            </Typography>
          </Stack>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {comment.createdAt.toLocaleDateString("en-US")}
          </Typography>
        </Stack>
        <Typography variant="body2">
          <ReactMarkdown children={comment.body} />
        </Typography>
      </CardContent>
    </Card>
  );
}
