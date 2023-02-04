import { Container } from "@mui/material";
import SearchInputCard from "./SearchInputCard";
import SearchResultCard from "./SearchResultCard";

/**
 * Page to search for issues
 */
export default function SearchPage() {
  return (
    <Container maxWidth="lg">
      <SearchInputCard />
      <SearchResultCard />
    </Container>
  );
}
