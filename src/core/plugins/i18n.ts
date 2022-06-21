import { createI18n } from "vue-i18n/index";

const messages = {
  en: {
    Switches: "Switches",
    PowerAndGas: "Gas/Water/Power",
    Others: "Others",
  },
  nl: {
    Switches: "Schakelaars",
    PowerAndGas: "Gas/Water/Licht",
    Others: "Overige",
  },
};

const i18n = createI18n({
  legacy: false,
  locale: process.env.VUE_APP_LOCALE,
  globalInjection: true,
  messages,
});

export default i18n;
