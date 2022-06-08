import { computed } from "vue";
import store from "@/store/index";

/**
 * Returns layout config
 * @returns {object}
 */
export const config = computed(() => {
  return store.getters.layoutConfig();
});

/**
 * Check if the page loader is enabled
 * @returns {boolean}
 */
export const loaderEnabled = computed(() => {
  return store.getters.layoutConfig("loader.display");
});

/**
 * Check if container width is fluid
 * @returns {boolean}
 */
export const contentWidthFluid = computed(() => {
  return store.getters.layoutConfig("content.width") === "fluid";
});

/**
 * Page loader logo image
 * @returns {string}
 */
export const loaderLogo = computed(() => {
  return process.env.BASE_URL + store.getters.layoutConfig("loader.logo");
});
