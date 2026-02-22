import type { RegisterInput } from './auth.validation';

export const authService = {
    async register(userData: RegisterInput) {
        return await $fetch('/api/auth/register', {
            method: 'POST',
            body: userData,
        });
    },

    async login(credentials: any) {
        return await $fetch('/api/auth/login', {
            method: 'POST',
            body: credentials,
        });
    },
};
