'use client';
import React, { useEffect } from 'react';
import ChatForm from './chat-form';
import ChatMessages, { Message } from './chat-messages';
import chatApi from '@/lib/api/chat';
import { useSession } from 'next-auth/react';

const UIChat = () => {
    const [messages, setMessages] = React.useState<Message[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const { data: session } = useSession();

    const handleSendMessage = async (content: string) => {
        // Add user message
        setIsLoading(true);
        const userMessage: Message = {
            content,
            role: 'user',
            userId: session?.user?.id,
        };

        const res = await chatApi.createChatMessage(userMessage);
        if (res?.status == 201) {
            fetchChatGroups();
        }
        setIsLoading(false);
    };

    const fetchChatGroups = async () => {
        const res = await chatApi.getChatGroups();

        if (res?.status == 200) {
            setMessages(res?.data);
        }
    };

    useEffect(() => {
        fetchChatGroups();
    }, []);

    return (
        <div className="flex flex-col bg-background">
            <div className="flex-1 overflow-hidden">
                <ChatMessages messages={messages} />
            </div>
            <ChatForm onSubmit={handleSendMessage} isLoading={isLoading} />
        </div>
    );
};

export default UIChat;
