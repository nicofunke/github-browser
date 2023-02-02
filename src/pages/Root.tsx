import { Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

/**
 * Basic layout of the application. Is rendered on each page
 */
export default function Root() {
  return (
    <>
      <Typography variant="h1" color="white" sx={{ marginBottom: "2rem" }}>
        Github Browser
      </Typography>
      <Outlet />
    </>
  );
}
