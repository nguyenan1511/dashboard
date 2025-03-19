import '@/app/globals.css';
import { AppSidebar } from '@/components/app-sidebar';
import Header from '@/components/ui/header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { Metadata } from 'next';
import { ReactNode } from 'react';
import '@/app/globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'My Dashboard',
    description: 'A modern dashboard application built with Next.js',
    viewport: 'width=device-width, initial-scale=1',
    icons: {
        icon: '/favicon.ico',
    },
};

export default function Layout({ children, session }: { children: ReactNode; session?: Session }) {
    return (
        <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
                    <SessionProvider session={session}>
                        <SidebarProvider>
                            <AppSidebar />
                            <SidebarInset>
                                <Header />
                                <main>{children}</main>
                            </SidebarInset>
                        </SidebarProvider>
                    </SessionProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
