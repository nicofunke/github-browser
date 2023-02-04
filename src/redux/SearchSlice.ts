import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { IssueState } from "../types/IssueState";

interface SearchState {
  searchTerm: string;
  stateFilter?: IssueState;
}

const initialState: SearchState = {
  searchTerm: "",
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
    updateStateFilter: (
      state,
      action: PayloadAction<IssueState | undefined>
    ) => {
      state.stateFilter = action.payload;
    },
  },
});

// Actions
export const { updateSearchTerm, updateStateFilter } = searchSlice.actions;

// Selectors
export const selectSearchTerm = (state: RootState) => state.search.searchTerm;

export const selectSearchStateFilter = (state: RootState) =>
  state.search.stateFilter;

export const selectSearchQuery = (state: RootState) => {
  const sanitizedSearchTerm = state.search.searchTerm.replaceAll('"', "");
  const stateFilter = state.search.stateFilter;
  return `repo:facebook/react ${
    stateFilter ? `is:${stateFilter}` : ""
  } "${sanitizedSearchTerm}" in:title,body is:public is:issue`;
};

// Reducer
export default searchSlice.reducer;
