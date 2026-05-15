import "./styles/global.css";
import { ErrorBoundary, LocationProvider, Route, Router } from "preact-iso";
import { NotFound } from "./routes";
import { BaseLayout } from "./layouts/base_layout";
import { AboutPage, AuthPage, PostsPage, PostViewPage } from "@/pages";

function wrapWithLayout(Component: any) {
  return (props: any) => (
    <BaseLayout>
      <Component {...props} />
    </BaseLayout>
  );
}

export function App() {
  return (
    <LocationProvider>
      <ErrorBoundary>
        <Router>
          <Route path="/" component={wrapWithLayout(PostsPage)}></Route>
          {/*<Route path="/profile/:id" component={}></Route>*/}
          <Route path="/posts/:id" component={wrapWithLayout(PostViewPage)} />
          <Route path="/about" component={wrapWithLayout(AboutPage)}></Route>
          <Route component={NotFound} default />
          <Route path="/auth" component={wrapWithLayout(AuthPage)} />
        </Router>
      </ErrorBoundary>
    </LocationProvider>
  );
}
