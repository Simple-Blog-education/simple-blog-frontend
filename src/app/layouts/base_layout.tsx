import { Footer } from "@/widgets/footer/footer";
import { Header } from "@/widgets/header/header";
import './base_layout.css'


interface BaseLayoutProps {
    children: preact.ComponentChildren;
}

export function BaseLayout({ children }: BaseLayoutProps) {
    return (
        <>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </>
    );
}