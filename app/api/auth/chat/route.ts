import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    try {
        console.log('🚀request---->', request);
        const chatGroups = await prisma.chatMessage.findMany({
            where: {
                groupId: '67da872745580f7fd695b2d0',
            },
        });
        console.log('🚀chatGroups---->', chatGroups);
        return NextResponse.json(chatGroups, { status: 200 });
    } catch (error) {
        console.error('Error fetching chat groups:', error);
        return NextResponse.json({ error: 'An unexpected error occurred while fetching chat groups' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { content, userId } = await request.json();
        const newMessage = await prisma.chatMessage.create({
            data: {
                content,
                groupId: '67da872745580f7fd695b2d0',
                userId,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
        });
        return NextResponse.json(newMessage, { status: 201 });
    } catch (error) {
        console.error('Error creating chat message:', error);
        return NextResponse.json({ error: 'An unexpected error occurred while creating chat message' }, { status: 500 });
    }
}
