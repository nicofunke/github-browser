import { Card, CardContent, Chip, Stack } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { IssueState } from "../types/IssueState";
import DelayedTextField from "./shared/DelayedTextField";

/**
 * Card that displays the search field and corresponding filter options
 */
export default function SearchInputCard({
  search,
}: {
  search: (searchTerm: string, state?: IssueState) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchState, setSearchState] = useState<IssueState>();

  useEffect(() => {
    searchTerm.trim() && search(searchTerm.trim(), searchState);
  }, [searchTerm, search, searchState]);

  const onSearchTermChanged = useCallback(
    (value: string) => setSearchTerm(value),
    [setSearchTerm]
  );

  return (
    <Card sx={{ marginBottom: "2rem" }}>
      <CardContent>
        <Stack justifyContent="center" alignItems="flex-start" spacing={1}>
          <DelayedTextField
            id="issue-search-term"
            label="Search for Issues"
            name="Search for Issues"
            variant="outlined"
            onChange={onSearchTermChanged}
            sx={{ width: "100%" }}
          />
          <StateFilterChips
            state={searchState}
            onChange={(state) => setSearchState(state)}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}

/**
 * Chips to choose the state filter for the issue search
 */
function StateFilterChips({
  onChange,
  state,
}: {
  onChange: (state?: IssueState) => void;
  state?: IssueState;
}) {
  return (
    <Stack direction="row" spacing={1}>
      <Chip
        onClick={() => onChange()}
        label="All Issues"
        color={!state ? "primary" : undefined}
      />
      <Chip
        label="Open Issues"
        onClick={() => onChange("OPEN")}
        color={state === "OPEN" ? "primary" : undefined}
      />
      <Chip
        label="Closed Issues"
        onClick={() => onChange("CLOSED")}
        color={state === "CLOSED" ? "primary" : undefined}
      />
    </Stack>
  );
}
