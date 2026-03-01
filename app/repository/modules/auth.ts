// File: repository/modules/product.ts

import type { LoginInput, RegisterInput } from '~/modules/auth/auth.validation';
import FetchFactory from '../factory';

// Create the ProductModule class
class AuthModule extends FetchFactory<any> {
    register(payload: RegisterInput) {
        return this.API('/api/auth/register', {
            method: 'POST',
            body: payload,
        });
    }

    login(payload: LoginInput) {
        return this.API('/api/auth/login', {
            method: 'POST',
            body: payload,
        });
    }

    logout() {
        return this.API('/api/auth/logout', {
            method: 'POST',
        });
    }
}

export default AuthModule;
