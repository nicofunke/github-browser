import { Card, CardContent, Chip, Stack } from "@mui/material";
import {
  selectSearchStateFilter,
  selectSearchTerm,
  updateSearchTerm,
  updateStateFilter,
} from "../../redux/SearchSlice";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import { IssueState } from "../../types/IssueState";
import DelayedTextField from "../../shared/DelayedTextField";

/**
 * Card that displays all inputs for the issue search
 */
export default function SearchInputCard() {
  return (
    <Card sx={{ marginBottom: "2rem" }}>
      <CardContent>
        <Stack justifyContent="center" alignItems="flex-start" spacing={1}>
          <SearchTermInput />
          <StateFilterChips />
        </Stack>
      </CardContent>
    </Card>
  );
}

/**
 * Input to enter the search term
 */
function SearchTermInput() {
  const searchTerm = useAppSelector(selectSearchTerm);
  const dispatch = useAppDispatch();
  const onChange = (input: string) => dispatch(updateSearchTerm(input.trim()));

  return (
    <DelayedTextField
      id="issue-search-term"
      label="Search for Issues"
      name="Search for Issues"
      variant="outlined"
      onChange={onChange}
      value={searchTerm}
      sx={{ width: "100%" }}
    />
  );
}

/**
 * Chips to choose the state filter for the issue search
 */
function StateFilterChips() {
  const activeFilter = useAppSelector(selectSearchStateFilter);
  const dispatch = useAppDispatch();
  const onChange = (filter?: IssueState) => dispatch(updateStateFilter(filter));

  return (
    <Stack direction="row" spacing={1}>
      <Chip
        onClick={() => onChange()}
        label="All Issues"
        color={!activeFilter ? "primary" : undefined}
      />
      <Chip
        label="Open Issues"
        onClick={() => onChange("OPEN")}
        color={activeFilter === "OPEN" ? "primary" : undefined}
      />
      <Chip
        label="Closed Issues"
        onClick={() => onChange("CLOSED")}
        color={activeFilter === "CLOSED" ? "primary" : undefined}
      />
    </Stack>
  );
}
