import { ReactNode } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="container">
            <Head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Roboto+Flex:wght@100;200;300;400;500;600;700;800;900&display=swap" // Замените на нужные веса
                />
            </Head>
            <Navbar />
            <main className="main">{children}</main>
            <Footer />
        </div>
    );
}
