import { Message } from '@/views/chat/chat-messages';
import api from './axios';

export const chatApi = {
    getChatGroups: async () => {
        const response = await api.get('/auth/chat');
        return {
            data: response.data,
            status: response.status,
        };
    },
    createChatMessage: async (userMessage: Message) => {
        const response = await api.post('/auth/chat', userMessage);
        return {
            data: response.data,
            status: response.status,
        };
    },
};

export default chatApi;
