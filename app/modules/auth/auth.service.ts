import type { LoginInput, RegisterInput } from './auth.validation';

export const authService = {
    async register(userData: RegisterInput) {
        const api = useApi();
        return await api('/api/auth/register', {
            method: 'POST',
            body: userData,
        });
    },

    async login(credentials: LoginInput) {
        const api = useApi();
        return await api('/api/auth/login', {
            method: 'POST',
            body: credentials,
        });
    },

    async logout() {
        const api = useApi();
        return await api('/api/auth/logout', {
            method: 'POST',
        });
    },
};
