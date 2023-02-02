import { Card, CardContent, Stack, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import { IssueComment } from "../../types/IssueComment";
import UserAvatar from "./UserAvatar";

/**
 * All information about an issue comment in a card
 */
export default function CommentCard({ comment }: { comment: IssueComment }) {
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
