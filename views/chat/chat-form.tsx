'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ChatFormProps {
    onSubmit: (message: string) => void;
    isLoading?: boolean;
}

const ChatForm = ({ onSubmit, isLoading = false }: ChatFormProps) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        onSubmit(message);
        setMessage('');
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-2">
                <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message..." className="min-h-[50px] max-h-[200px]" disabled={isLoading} />
                <Button type="submit" size="icon" disabled={isLoading || !message.trim()} className="shrink-0 h-[50px] w-[50px]">
                    <Send className="h-7xl w-7xl" />
                </Button>
            </div>
        </form>
    );
};

export default ChatForm;
