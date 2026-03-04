// File: repository/modules/product.ts

import type { TProfileUpdate } from '~/modules/user/user.validation';
import FetchFactory from '../factory';

// Create the ProductModule class
class UserModule extends FetchFactory<any> {
    getProfile() {
        return this.API('/api/user/current', {
            method: 'GET',
        });
    }

    updateProfile(payload: FormData) {
        return this.API('/api/user/update', {
            method: 'PUT',
            body: payload,
        });
    }
}

export default UserModule;
