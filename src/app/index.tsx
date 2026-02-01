import './ui/app.css'
import {About} from "@/pages/about";
import {ErrorBoundary, LocationProvider, Route, Router} from 'preact-iso';
import {NotFound} from "./routes/not_found.tsx";
import {Posts} from "@/pages/posts";
import {PostDetails} from "@/pages/post_details/ui/post_details.tsx";
import { Footer } from '@/shared/ui/footer/index.ts';

export function Index() {
    return (
        <LocationProvider>
            <ErrorBoundary>
                {/* <header>
                    <nav>
                        <a href={`/`}>Все статьи</a>
                        {true ? <>
                            <a href={`/profile/${'user_id'}`}>Профиль</a>
                            <a onClick={() => console.log("Выйти")}>Выйти</a>
                        </> : ''}
                    </nav>
                </header> */}
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
