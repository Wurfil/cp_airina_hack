// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/eslint-module',
    'nuxt-quasar-ui',
    'nuxt-mdi',
  ],
  quasar: {
    plugins: [
      'Notify',
    ],
    lang: 'ru',

    config: {
      brand: {
        primary: '#20808d',
        secondary: '#13343b',
      },
    },
  },
  css: ['@/assets/css/tailwind.css', '@/assets/css/main.css'],
  runtimeConfig: {
    public: {
      baseURL: 'http://localhost:8080/api',
      headers: {},
    },
  },

});
