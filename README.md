# Github Browser

## Setup

The app needs a Github personal access token in order to work properly. You can define one in the `ENV` variable `REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN` (see `.env.example`)

## Available Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run compile`

Run codegen to create types for GraphQL queries

## Libraries Used

- React
- React Router
- Apollo/Graphql
- Redux/React-Redux
- Material UI
- React Markdown
- React Infinite Scroller
- Jest
- React Testing Library

## Improvement Ideas

- Error boundary
- Implement tests
  - wrong URL params
  - Infinite scroll triggers
- Improve component and folder structure
- Improve overall design
- Favicon
