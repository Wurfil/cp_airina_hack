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
        primary: '#9525c2',
        secondary: '#f1f3f5',
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
