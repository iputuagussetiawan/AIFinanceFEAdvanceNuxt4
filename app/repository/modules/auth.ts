// File: repository/modules/product.ts

import type { LoginInput, RegisterInput } from '~/modules/auth/auth.validation';
import FetchFactory from '../factory';

// Create the ProductModule class
class AuthModule extends FetchFactory<any> {
    register(payload: RegisterInput) {
        return super.call('/api/auth/register', {
            method: 'POST',
            body: payload,
        });
    }

    login(payload: LoginInput) {
        return super.call('/api/auth/login', {
            method: 'POST',
            body: payload,
        });
    }

    logout() {
        return super.call('/api/auth/logout', {
            method: 'POST',
        });
    }
}

export default AuthModule;
