import "./styles/global.css";
import { About } from "@/pages/about_page/about";
import { ErrorBoundary, LocationProvider, Route, Router } from "preact-iso";
import { Posts } from "@/pages/posts";
import { PostDetails } from "@/pages/post_view_page";
import { NotFound } from "./routes";
import { Auth } from "@/pages/auth_page/ui/auth_container";
import { BaseLayout } from "./layouts/base_layout";

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
          <Route path="/" component={wrapWithLayout(Posts)}></Route>
          {/*<Route path="/profile/:id" component={}></Route>*/}
          <Route path="/posts/:id" component={wrapWithLayout(PostDetails)} />
          <Route path="/about" component={wrapWithLayout(About)}></Route>
          <Route component={NotFound} default />
          <Route path="/auth" component={wrapWithLayout(Auth)} />
        </Router>
      </ErrorBoundary>
    </LocationProvider>
  );
}
