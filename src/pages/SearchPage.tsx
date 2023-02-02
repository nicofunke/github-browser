import { Container, LinearProgress } from "@mui/material";
import InfiniteScroll from "react-infinite-scroller";
import { useIssueSearch } from "../apollo/useIssueSearch";
import SearchInputCard from "../components/SearchInputCard";
import SearchResultCard from "../components/SearchResultCard";

/**
 * Page to search for issues
 */
export default function SearchPage() {
  const { search, loading, error, data, called, fetchMore } = useIssueSearch();
  const hasMore = data.issues.length < data.issueCount;
  const loadMore = () => {
    if (!hasMore) return;
    fetchMore({
      variables: { after: data.issues[data.issues.length - 1].cursor },
    });
  };

  return (
    <Container maxWidth="lg">
      <SearchInputCard search={search} />
      {called && (
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={hasMore}
          loader={<LinearProgress key="loading" />}
        >
          <SearchResultCard
            searchResult={data}
            loading={loading}
            error={error}
          />
        </InfiniteScroll>
      )}
    </Container>
  );
}
