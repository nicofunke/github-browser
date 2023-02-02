import { Container } from "@mui/material";
import { useIssueSearch } from "../apollo/useIssueSearch";
import SearchInputCard from "../components/SearchInputCard";
import SearchResultCard from "../components/SearchResultCard";

/**
 * Page to search for issues
 */
export default function SearchPage() {
  const { search, loading, error, data, called } = useIssueSearch();
  return (
    <Container maxWidth="lg">
      <SearchInputCard search={search} />
      {called && (
        <SearchResultCard searchResult={data} loading={loading} error={error} />
      )}
    </Container>
  );
}
