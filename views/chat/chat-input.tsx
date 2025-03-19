import React, { useState, KeyboardEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { Message } from './chat-messages';
import io from 'socket.io-client';

interface ChatInputProps {
    onSendMessage?: (message: Message) => void;
    className?: string;
    userId?: string;
}

const ChatInput = ({ onSendMessage, className, userId }: ChatInputProps) => {
    const [message, setMessage] = useState('');
    const [socket] = useState(() =>
        io({
            path: '/api/socket',
        })
    );

    const handleSendMessage = () => {
        if (message.trim()) {
            const newMessage: Message = {
                content: message,
                role: 'user',
                userId: userId,
                createdAt: new Date(),
            };

            socket.emit('message', newMessage);
            if (onSendMessage) {
                onSendMessage(newMessage);
            }
            setMessage('');
        }
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!message.trim()}>
                <Send className="h-4 w-4" />
            </Button>
        </div>
    );
};

export default ChatInput; 