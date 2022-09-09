import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
  runtimeConfig: {
    TELEGRAM_BOT_TOKEN: "",
    ADMINISTRATORS_IDS: "",
    SYSTEM_ADMINISTRATOR_IDS: "",
  },
  nitro: {
    preset: "vercel",
  },
});
