import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Button,
  Card,
  CardContent,
  Collapse,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "redux/reduxHooks";
import {
  selectSearchStateFilter,
  selectSearchTarget,
  selectSearchTerm,
  updateSearchTarget,
  updateSearchTerm,
  updateStateFilter,
} from "redux/SearchSlice";
import DelayedTextField from "shared/DelayedTextField";
import { IssueStateFilter } from "types/IssueStateFilter";
import { SearchTarget } from "types/SearchTarget";

/**
 * Card that displays all inputs for the issue search
 */
export default function SearchInputCard() {
  return (
    <Card sx={{ marginBottom: "2rem" }}>
      <CardContent>
        <Stack justifyContent="center" alignItems="flex-start" spacing={1}>
          <SearchTermInput />
          <FilterOptions />
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
 * Displays options to filter search results
 */
function FilterOptions() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="small" onClick={() => setOpen(!open)}>
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        Advanced Options
      </Button>
      <Collapse in={open} sx={{ paddingTop: ".5rem", width: "100%" }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <SearchTargetSelect />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StateFilterSelect />
          </Grid>
        </Grid>
      </Collapse>
    </>
  );
}

/**
 * Select for defining the search target (body/title)
 */
function SearchTargetSelect() {
  const searchTarget = useAppSelector(selectSearchTarget);
  const dispatch = useAppDispatch();
  const onChange = (target: SearchTarget) =>
    dispatch(updateSearchTarget(target));
  return (
    <FormControl fullWidth>
      <InputLabel id="search-target-label">Search in</InputLabel>
      <Select<SearchTarget>
        labelId="search-target-label"
        id="search-target"
        value={searchTarget}
        label="Search in"
        size="small"
        onChange={(e) => onChange(e.target.value as SearchTarget)}
      >
        <MenuItem value={SearchTarget.both}>Title and Description</MenuItem>
        <MenuItem value={SearchTarget.title}>Title</MenuItem>
        <MenuItem value={SearchTarget.body}>Description</MenuItem>
      </Select>
    </FormControl>
  );
}

/**
 * Select to defined the issue state filter
 */
function StateFilterSelect() {
  const activeFilter = useAppSelector(selectSearchStateFilter);
  const dispatch = useAppDispatch();
  const onChange = (filter: IssueStateFilter) =>
    dispatch(updateStateFilter(filter));

  return (
    <FormControl fullWidth>
      <InputLabel id="state-filter-label">Issue State</InputLabel>
      <Select<IssueStateFilter>
        labelId="state-filter-label"
        id="state-filter"
        value={activeFilter}
        label="Issue State"
        size="small"
        onChange={(e) => onChange(e.target.value as IssueStateFilter)}
      >
        <MenuItem value={IssueStateFilter.none}>All</MenuItem>
        <MenuItem value={IssueStateFilter.open}>Open</MenuItem>
        <MenuItem value={IssueStateFilter.closed}>Closed</MenuItem>
      </Select>
    </FormControl>
  );
}
