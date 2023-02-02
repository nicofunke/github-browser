import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import GithubApolloProvider from "./apollo/GithubApolloProvider";
import Router from "./Router";

function App() {
  return (
    <GithubApolloProvider>
      <Router />
    </GithubApolloProvider>
  );
}

export default App;
