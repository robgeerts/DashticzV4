import { createApp } from "vue";
import moment from 'moment';
import App from "./App.vue";

moment.locale(process.env.VUE_APP_LOCALE);

import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import i18n from "@/core/plugins/i18n";

import { initApexCharts } from "@/core/plugins/apexcharts";
import { initInlineSvg } from "@/core/plugins/inline-svg";
import { initVeeValidate } from "@/core/plugins/vee-validate";

const app = createApp(App);

app.config.globalProperties.$filters = {
  showDate(date) {
    return moment(date).fromNow()
  },
}

app.use(store);
app.use(router);
app.use(ElementPlus);

initApexCharts(app);
initInlineSvg(app);
initVeeValidate();

app.use(i18n);
app.mount("#app");
