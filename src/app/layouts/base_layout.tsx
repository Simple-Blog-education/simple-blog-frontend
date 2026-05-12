import { Footer } from "@/widgets/footer/footer";
import { Header } from "@/widgets/header/header";

interface BaseLayoutProps {
    children: preact.ComponentChildren;
}

export function BaseLayout({children}: BaseLayoutProps) {
    return (
        <>
            <Header/>
            <main class="main-content">
                {children}
            </main>
            <Footer/>
        </>
    );
}