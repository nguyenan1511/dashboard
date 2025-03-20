import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { email, password, name } = await request.json();

        // Check if email already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (existingUser) {
            return NextResponse.json({ error: 'This email is already registered. Please use a different email or login.' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
        });
        console.log('🚀user---->', user);
        // Don't send the password back
        const { ...userWithoutPassword } = user;

        return NextResponse.json(userWithoutPassword, { status: 201 });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'An unexpected error occurred during registration' }, { status: 500 });
    }
}
