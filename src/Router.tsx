import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import IssuePage from "./pages/issue/IssuePage";
import Root from "./pages/Root";
import SearchPage from "./pages/search/SearchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/issue/:issueNumber",
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
