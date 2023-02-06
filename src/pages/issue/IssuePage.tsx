import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Link, Navigate, useParams } from "react-router-dom";
import IssueComments from "./IssueComments";
import IssueMainInformation from "./IssueMainInformation";

/**
 * Extracts the issue number from the URL params
 */
function useIssueNumberParam() {
  let { issueNumber } = useParams();
  const parsed = +(issueNumber || "");
  return parsed;
}

/**
 * Details page for a single issue
 */
export default function IssuePage() {
  const issueNumber = useIssueNumberParam();
  if (isNaN(issueNumber)) {
    return <Navigate replace to="/" />;
  }
  console.log(issueNumber);
  return (
    <Container maxWidth="md">
      <BackToSearchButton />
      <IssueMainInformation issueNumber={issueNumber} />
      <IssueComments issueNumber={issueNumber} />
    </Container>
  );
}

function BackToSearchButton() {
  return (
    <Typography color="white" sx={{ marginBottom: "1rem" }}>
      <Link to="/">
        <Stack direction="row" alignItems="center">
          <ArrowBackIosIcon color="inherit" />
          <span>Back to Search</span>
        </Stack>
      </Link>
    </Typography>
  );
}
