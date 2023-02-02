import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import IssuePage, { issuePageUrl } from "./pages/IssuePage";
import Root from "./pages/Root";
import SearchPage from "./pages/SearchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: issuePageUrl(),
        element: <IssuePage />,
      },
      {
        path: "/",
        element: <SearchPage />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
