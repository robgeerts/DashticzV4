import { createI18n } from "vue-i18n/index";

const messages = {
  en: {
    hello: "Hello",
  },
  nl: {
    hello: "Hallo",
  },
};

const i18n = createI18n({
  legacy: false,
  locale: process.env.VUE_APP_LOCALE,
  globalInjection: true,
  messages,
});

export default i18n;
