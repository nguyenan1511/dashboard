import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/prisma/prisma';
import * as bcryptjs from 'bcryptjs';
import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

interface Credentials {
    email: string;
    password: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email and password are required');
                }

                const { email, password } = credentials as Credentials;

                try {
                    const user = await prisma.user.findUnique({
                        where: { email },
                        select: {
                            id: true,
                            email: true,
                            name: true,
                            password: true,
                        },
                    });

                    if (!user || !user.password) {
                        throw new Error('Invalid email or password');
                    }

                    const isPasswordValid = await bcryptjs.compare(password, user.password);

                    if (!isPasswordValid) {
                        throw new Error('Invalid email or password');
                    }

                    return {
                        id: user.id,
                        email: user.email || '',
                        name: user.name || '',
                    };
                } catch (error) {
                    console.error('Authentication error:', error);
                    throw new Error('Authentication failed');
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            if (session.user && token) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
    },
});
