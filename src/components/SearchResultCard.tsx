import { ApolloError } from "@apollo/client";
import {
  Card,
  LinearProgress,
  CardContent,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Alert,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { issuePageUrl } from "../pages/IssuePage";
import { IssueInfo } from "../types/IssueInfo";
import { IssueSearchResult } from "../types/IssueSearchResult";
import IssueStateChip from "./shared/IssuStateChip";
import UserAvatar from "./shared/UserAvatar";

type Props = {
  searchResult: IssueSearchResult;
  loading?: boolean;
  error?: ApolloError;
};

/**
 * Displays the results of the issue search, including loading and error states
 */
export default function SearchResultCard({
  searchResult,
  loading,
  error,
}: Props) {
  if (loading)
    return (
      <Card>
        <LinearProgress />
      </Card>
    );
  if (error) {
    return (
      <Card>
        <Alert severity="error">
          Something went wrong. Please try again later
        </Alert>
      </Card>
    );
  }
  return (
    <Card>
      <CardContent>
        <Header issueCount={searchResult.issueCount} />
        <IssuesList issues={searchResult.issues} />
      </CardContent>
    </Card>
  );
}

function Header({ issueCount }: { issueCount: number }) {
  const headerText = `${issueCount || "No"} Issue${
    issueCount === 1 ? "" : "s"
  } Found`;
  return (
    <Typography variant="h5" color="text.secondary">
      {headerText}
    </Typography>
  );
}

/**
 * Displays a list of issues with basic information
 */
function IssuesList({ issues }: { issues: IssueInfo[] }) {
  const navigate = useNavigate();
  if (!issues.length) return <></>;
  return (
    <List>
      {issues.map(({ issueNumber, title, author, createdAt, state }) => (
        <ListItemButton
          key={issueNumber}
          onClick={() => navigate(issuePageUrl(issueNumber))}
        >
          <ListItemIcon>
            <UserAvatar author={author} />
          </ListItemIcon>
          <ListItemText
            primary={
              <>
                <span style={{ marginRight: "0.5rem" }}>{title} </span>
                <IssueStateChip state={state} />
              </>
            }
            secondary={`${createdAt.toLocaleDateString("en-US")} by ${
              author?.login || "Deleted User"
            } #${issueNumber}`}
          />
        </ListItemButton>
      ))}
    </List>
  );
}
