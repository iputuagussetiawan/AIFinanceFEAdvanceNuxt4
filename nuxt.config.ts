// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    build: {
        // This tells Nuxt to handle the "exports" logic for these specific packages
        transpile: ['@tanstack/vue-query', 'ufo', 'vee-validate'],
    },
    modules: [
        '@nuxtjs/tailwindcss',
        'shadcn-nuxt',
        'nuxt-lucide-icons',
        '@nuxt/image',
    ],
    plugins: ['~/plugins/vue-query.ts'],
    lucide: {
        namePrefix: 'Icon',
    },

    runtimeConfig: {
        public: {
            appBaseUrl: process.env.APP_BASE_URL || '',
            apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:8000/api',
        },
    },
    shadcn: {
        /**
         * Prefix for all the imported component.
         * @default "Ui"
         */
        prefix: '',
        /**
         * Directory that the component lives in.
         * Will respect the Nuxt aliases.
         * @link https://nuxt.com/docs/api/nuxt-config#alias
         * @default "@/components/ui"
         */
        componentDir: '@/components/ui',
    },
});
