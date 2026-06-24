import "./styles/global.css";
import { ErrorBoundary, LocationProvider, Route, Router } from "preact-iso";
import { NotFound } from "./routes";
import { BaseLayout } from "./layouts/base_layout";
import { AboutPage, AuthPage, PostsPage, PostViewPage, EditPostPage, CreatePostPage, ProfilePage, EditProfilePage, ChangePasswordPage } from "@/pages";
import { currentUser, isAuthenticated } from "@/features/auth";
import { getCurrentUser } from "@/features/auth/api/auth.api";
import { useEffect } from "preact/hooks";
import { ProtectedRoute } from "@/shared/ui";
import { AdminRoute } from "@/shared/ui/admin_route/admin_route";

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
          <AdminRoute path="/posts/:id/edit" component={wrapWithLayout(EditPostPage)} />
          <AdminRoute path="/posts/new" component={wrapWithLayout(CreatePostPage)} />
          <ProtectedRoute path="/profile/:username/edit" component={wrapWithLayout(EditProfilePage)} />
          <ProtectedRoute path="/profile/:username/change_password" component={wrapWithLayout(ChangePasswordPage)} />
          <Route path="/profile/:username" component={wrapWithLayout(ProfilePage)} />
          <Route path="/posts/:id" component={wrapWithLayout(PostViewPage)} />
          <Route path="/about" component={wrapWithLayout(AboutPage)} />
          <Route component={NotFound} default />
          <Route path="/auth" component={wrapWithLayout(AuthPage)} />
        </Router>
      </ErrorBoundary>
    </LocationProvider>
  );
}
