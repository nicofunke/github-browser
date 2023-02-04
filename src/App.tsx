import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Provider } from "react-redux";
import GithubApolloProvider from "./apollo/GithubApolloProvider";
import Router from "./Router";
import { setupStore } from "./redux/store";

function App() {
  return (
    <Provider store={setupStore()}>
      <GithubApolloProvider>
        <Router />
      </GithubApolloProvider>
    </Provider>
  );
}

export default App;
