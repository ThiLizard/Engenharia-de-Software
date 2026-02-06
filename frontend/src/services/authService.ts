import api from './api';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    name: string;
    userType: 'ESCOLA' | 'MEDICO' | 'RESPONSAVEL' | 'ADMIN';
}

export interface User {
    id: number;
    email: string;
    name: string;
    userType: 'ESCOLA' | 'MEDICO' | 'RESPONSAVEL' | 'ADMIN';
}

export interface LoginResponse {
    token: string;
    user: User;
}

const authService = {
    async login(email: string, password: string): Promise<LoginResponse> {
        const response = await api.post<LoginResponse>('/auth/login', {
            email,
            password,
        });
        return response.data;
    },

    async register(data: RegisterRequest): Promise<User> {
        const response = await api.post<User>('/auth/register', data);
        return response.data;
    },

    async getCurrentUser(): Promise<User> {
        const response = await api.get<User>('/auth/me');
        return response.data;
    },

    async forgotPassword(email: string): Promise<{ message: string; token?: string }> {
        const response = await api.post('/auth/forgot-password', { email });
        return response.data;
    },

    async validateResetToken(token: string): Promise<boolean> {
        const response = await api.get<{ valid: boolean }>(`/auth/validate-token/${token}`);
        return response.data.valid;
    },

    async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
        const response = await api.post('/auth/reset-password', {
            token,
            newPassword,
        });
        return response.data;
    },

    logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
    },
};

export default authService;
