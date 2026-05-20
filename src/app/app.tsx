import "./styles/global.css";
import { ErrorBoundary, LocationProvider, Route, Router } from "preact-iso";
import { NotFound } from "./routes";
import { BaseLayout } from "./layouts/base_layout";
import { AboutPage, AuthPage, PostsPage, PostViewPage, EditPostPage, CreatePostPage } from "@/pages";
import { currentUser, isAuthenticated } from "@/features/auth";
import { getCurrentUser } from "@/features/auth/api/auth.api";
import { useEffect } from "preact/hooks";

function wrapWithLayout(Component: any) {
  return (props: any) => (
    <BaseLayout>
      <Component {...props} />
    </BaseLayout>
  );
}

export function App() {

  useEffect(() => {
    if (isAuthenticated.value && !currentUser.value) {
      getCurrentUser()
        .then(user => {
          currentUser.value = user;
          isAuthenticated.value = true;
        })
        .catch(() => {
          localStorage.removeItem('token');
          isAuthenticated.value = false;
        })
    }
  }, [])


  return (
    <LocationProvider>
      <ErrorBoundary>
        <Router>
          <Route path="/" component={wrapWithLayout(PostsPage)} />
          <Route path="/posts/:id/edit" component={wrapWithLayout(EditPostPage)} />
          <Route path="/posts/new" component={wrapWithLayout(CreatePostPage)} />
          {/*<Route path="/profile/:id" component={}/>*/}
          <Route path="/posts/:id" component={wrapWithLayout(PostViewPage)} />
          <Route path="/about" component={wrapWithLayout(AboutPage)} />
          <Route component={NotFound} default />
          <Route path="/auth" component={wrapWithLayout(AuthPage)} />
        </Router>
      </ErrorBoundary>
    </LocationProvider>
  );
}
