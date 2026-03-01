// File: plugins/api.ts
import { defineNuxtPlugin } from 'nuxt/app';
import AuthModule from '~/repository/modules/auth';
import UserModule from '~/repository/modules/user';

// Define an interface for type-safety
interface IApiInstance {
    auth: AuthModule;
    user: UserModule;
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
