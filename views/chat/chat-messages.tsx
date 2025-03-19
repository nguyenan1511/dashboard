'use client';
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession } from 'next-auth/react';
import io, { Socket } from 'socket.io-client';

export interface Message {
    id?: string;
    content: string;
    role: 'user' | 'assistant';
    createdAt?: Date;
    userId?: string;
}

interface ChatMessagesProps {
    messages: Message[];
    className?: string;
    onNewMessage?: (message: Message) => void;
}

const ChatMessages = ({ messages: initialMessages, className, onNewMessage }: ChatMessagesProps) => {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [socket, setSocket] = useState<Socket | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const { data: session } = useSession();
    const _id = session?.user?.id;

    useEffect(() => {
        const socketInstance = io({
            path: '/api/socket',
        });
        socketInstance.on('connect', () => {
            console.log('Connected to Socket.IO server');
        });
        socketInstance.on('message', (message: Message) => {
            setMessages((prev) => [...prev, message]);
            if (onNewMessage) {
                onNewMessage(message);
            }
        });
        setSocket(socketInstance);
        return () => {
            socketInstance.disconnect();
        };
    }, [onNewMessage]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    // Update local messages when prop changes
    useEffect(() => {
        setMessages(initialMessages);
    }, [initialMessages]);

    return (
        <ScrollArea className={cn('h-[500px] p-4', className)}>
            <div className="space-y-4">
                {messages.map((message, index) => (
                    <div key={message.id} ref={index === messages.length - 1 ? scrollRef : null} className={cn('flex items-start gap-3', message.userId === _id ? 'flex-row-reverse' : 'flex-row')}>
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={message.userId === _id ? '/assistant-avatar.png' : '/user-avatar.png'} alt={message.role} />
                            <AvatarFallback className="bg-primary text-primary-foreground">{message.userId === _id ? 'T' : 'M'}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-1">
                            <div className={cn('rounded-lg px-4 py-2', message.userId === _id ? 'bg-primary text-primary-foreground' : 'bg-muted')}>{message.content}</div>
                            {message.createdAt && (
                                <span className={cn('text-xs text-muted-foreground', message.userId === _id ? 'text-right' : 'text-left')}>
                                    {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </ScrollArea>
    );
};

export default ChatMessages;
