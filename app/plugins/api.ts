// File: plugins/api.ts
import { defineNuxtPlugin } from 'nuxt/app';
import AuthModule from '~/repository/modules/auth';
import UserModule from '~/repository/modules/user';
import SessionModule from '~/repository/modules/session';

// Define an interface for type-safety
interface IApiInstance {
    auth: AuthModule;
    user: UserModule;
    session: SessionModule;
    // category: CategoryModule
    // story: StoryModule

    // userStory: UserStoryModule
    // other modules
}

export default defineNuxtPlugin(() => {
    // Register all modules
    const modules: IApiInstance = {
        auth: new AuthModule(),
        user: new UserModule(),
        session: new SessionModule(),
        // category: new CategoryModule(),
        // story: new StoryModule(),

        // userStory: new UserStoryModule()
    };

    // Provide the modules as a global injection
    return {
        provide: {
            api: modules,
        },
    };
});
