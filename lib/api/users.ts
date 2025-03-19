import api from './axios';

export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}

export interface UpdateUserData {
    name?: string;
    email?: string;
}

export const usersApi = {
    getCurrentUser: async () => {
        const response = await api.get<User>('/users/me');
        return response.data;
    },

    updateUser: async (userId: string, data: UpdateUserData) => {
        const response = await api.patch<User>(`/users/${userId}`, data);
        return response.data;
    },

    getUsers: async () => {
        const response = await api.get<User[]>('/users');
        return response.data;
    },
};

export default usersApi;
