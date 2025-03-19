import api from './axios';

export interface RegisterData {
    email: string;
    password: string;
    name: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export const authApi = {
    register: async (data: RegisterData) => {
        const response = await api.post('/auth/register', data);
        return response;
    },

    login: async (data: LoginData) => {
        const response = await api.post('/auth/login', data);
        return response;
    },

    // Add more auth-related API calls here as needed
};

export default authApi;
