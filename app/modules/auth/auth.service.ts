import { email } from 'zod/v4/mini';
import type {
    ForgotPasswordInput,
    LoginInput,
    RegisterInput,
    ResetPasswordPayload,
} from './auth.validation';

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

    async forgotPassword(email: ForgotPasswordInput) {
        const api = useApi();
        return await api('/api/auth/password/forgot', {
            method: 'POST',
            body: email,
        });
    },

    async resetPassword(credentials: ResetPasswordPayload) {
        const api = useApi();
        return await api('/api/auth/password/reset', {
            method: 'POST',
            body: {
                password: credentials.password,
                verificationCode: credentials.verificationCode,
            },
        });
    },

    async logout() {
        const api = useApi();
        return await api('/api/auth/logout', {
            method: 'POST',
        });
    },
};
