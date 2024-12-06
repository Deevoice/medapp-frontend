import { ReactNode } from 'react';
import Navbar from '@/components/Navbar'; // Компонент навигации
import Footer from '@/components/Footer'; // Компонент футера
import styles from '@/styles/globals.module.css';
import '@/styles/globals.css';


interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="container">
            <Navbar />
            <main className="main">{children}</main>
            <Footer />
        </div>
    );
}
