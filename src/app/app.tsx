import './styles/app.css'
import {About} from "@/pages/about";
import {ErrorBoundary, LocationProvider, Route, Router} from 'preact-iso';
import {Posts} from "@/pages/posts";
import {PostDetails} from "@/pages/post_details";
import { NotFound } from './routes';
import { Auth } from '@/pages/auth/ui/auth_container';
import { BaseLayout } from './layouts/BaseLayout';

function wrapWithLayout(Component: any) {
    return (props: any) => (
        <BaseLayout>
            <Component {...props}/>
        </BaseLayout>
    )
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
                    <Route path='/auth' component={wrapWithLayout(Auth)}/>
                </Router>
            </ErrorBoundary>
        </LocationProvider>
  );
}
