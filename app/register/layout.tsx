import '@/app/globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import type { Metadata } from 'next';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
    title: 'Register',
    description: 'Register to your account',
};

export default function RegisterLayout({ children, session }: { children: React.ReactNode; session: Session }) {
    return (
        <html lang="en" className="dark" style={{ colorScheme: 'dark' }} suppressHydrationWarning={true}>
            <body className="antialiased">
                <SessionProvider session={session}>
                    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
                        {children}
                    </ThemeProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
