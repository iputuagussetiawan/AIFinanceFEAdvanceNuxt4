import FetchFactory from '../factory';

class SessionModule extends FetchFactory<any> {
    getSessions() {
        return this.API('/api/session/all', {
            method: 'GET',
        });
    }
}

export default SessionModule;
