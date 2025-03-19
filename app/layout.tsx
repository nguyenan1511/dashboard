import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'My Dashboard',
    description: 'A modern dashboard application built with Next.js',
    icons: {
        icon: '/favicon.ico',
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
