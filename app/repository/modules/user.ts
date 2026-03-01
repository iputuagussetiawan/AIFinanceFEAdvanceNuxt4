// File: repository/modules/product.ts

import FetchFactory from '../factory';

// Create the ProductModule class
class UserModule extends FetchFactory<any> {
    getProfile() {
        return this.API('/api/user/current', {
            method: 'GET',
        });
    }
}

export default UserModule;
