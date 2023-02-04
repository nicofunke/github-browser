import { Chip } from "@mui/material";
import { IssueState } from "../types/IssueState";

/**
 * Chip to display the state of an issue
 */
export default function IssueStateChip({ state }: { state: IssueState }) {
  if (state === "CLOSED")
    return <Chip component="p" label="Closed" size="small" />;
  return <Chip component="p" label="Open" color="success" size="small" />;
}
