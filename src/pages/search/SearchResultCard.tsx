import {
  Alert,
  Card,
  CardContent,
  LinearProgress,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/reduxHooks";
import { selectSearchTerm } from "../../redux/SearchSlice";
import IssueStateChip from "../../shared/IssueStateChip";
import UserAvatar from "../../shared/UserAvatar";
import { IssueInfo } from "../../types/IssueInfo";
import { IssueSearchResult } from "../../types/IssueSearchResult";
import { useIssueSearch } from "./useIssueSearch";

/**
 * Displays the results of the issue search, including loading and error states
 */
export default function SearchResultCard() {
  const searchTerm = useAppSelector(selectSearchTerm);
  if (!searchTerm) return <></>;
  return (
    <Card>
      <SearchHandler>
        {(searchResult) => (
          <CardContent>
            <Header issueCount={searchResult.issueCount} />
            <IssuesList issues={searchResult.issues} />
          </CardContent>
        )}
      </SearchHandler>
    </Card>
  );
}

/**
 * Wrapper component that takes care of loading search results and supplies the result to its children
 */
function SearchHandler({
  children,
}: {
  children: (issues: IssueSearchResult) => ReactNode;
}) {
  const { loading, error, data: searchResult, fetchMore } = useIssueSearch();
  const hasMore = searchResult.issues.length < searchResult.issueCount;
  const loadMore = () => {
    if (!hasMore) return;
    fetchMore({
      variables: {
        after: searchResult.issues[searchResult.issues.length - 1].cursor,
      },
    });
  };
  if (loading) return <LinearProgress />;
  if (error) {
    return (
      <Alert severity="error">
        Something went wrong. Please try again later
      </Alert>
    );
  }
  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadMore}
      hasMore={hasMore}
      loader={<LinearProgress key="loading" />}
    >
      {children(searchResult)}
    </InfiniteScroll>
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
          onClick={() => navigate(`/issue/${issueNumber}`)}
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
