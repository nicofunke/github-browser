import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { SearchTarget } from "../types/SearchTarget.d";
import { IssueStateFilter } from "../types/IssueStateFilter.d";

interface SearchState {
  searchTerm: string;
  stateFilter: IssueStateFilter;
  searchTarget: SearchTarget;
}

const initialState: SearchState = {
  searchTerm: "",
  searchTarget: SearchTarget.both,
  stateFilter: IssueStateFilter.none,
};

/**
 * Slice for the issue search state
 */
export const searchSlice = createSlice({
  name: "issue-search",
  initialState,
  reducers: {
    updateSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    updateStateFilter: (state, action: PayloadAction<IssueStateFilter>) => {
      state.stateFilter = action.payload;
    },
    updateSearchTarget: (state, action: PayloadAction<SearchTarget>) => {
      state.searchTarget = action.payload;
    },
  },
});

// Actions
export const { updateSearchTerm, updateStateFilter, updateSearchTarget } =
  searchSlice.actions;

// Selectors
export const selectSearchTerm = (state: RootState) => state.search.searchTerm;

export const selectSearchStateFilter = (state: RootState) =>
  state.search.stateFilter;

export const selectSearchTarget = (state: RootState) =>
  state.search.searchTarget;

export const selectSearchQuery = (state: RootState) => {
  const sanitizedSearchTerm = state.search.searchTerm.replaceAll('"', "");
  const stateFilter = state.search.stateFilter;
  return `repo:facebook/react ${
    stateFilter !== IssueStateFilter.none ? `is:${stateFilter}` : ""
  } "${sanitizedSearchTerm}" in:${
    state.search.searchTarget
  } is:public is:issue sort:created-desc`;
};

// Reducer
export default searchSlice.reducer;
