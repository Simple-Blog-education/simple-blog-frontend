import './ui/app.css'
import {About} from "@/pages/about";
import {ErrorBoundary, LocationProvider, Route, Router} from 'preact-iso';
import {Posts} from "@/pages/posts";
import {PostDetails} from "@/pages/post_details";
import { Footer } from '@/shared/ui/footer';
import { Header } from '@/shared/ui/header';
import { NotFound } from './routes';

export function Index() {
    return (
        <LocationProvider>
            <ErrorBoundary>
                <Header/>
                <main>
                <Router>
                    <Route path="/" component={Posts}></Route>
                    {/*<Route path="/profile/:id" component={}></Route>*/}
                    <Route path="/posts/:id" component={PostDetails} />
                    <Route path="/about" component={About}></Route>
                    <Route component={NotFound} default />
                </Router>
                </main>
                <Footer/>
            </ErrorBoundary>
        </LocationProvider>
  );
}
