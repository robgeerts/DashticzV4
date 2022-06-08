<template>
  <KTLoader v-if="loaderEnabled" :logo="loaderLogo" />

  <!-- begin:: Body -->
  <div class="page d-flex flex-row flex-column-fluid" id="kt_layout">
    <div id="kt_wrapper" class="d-flex flex-column flex-row-fluid wrapper">

      <!-- begin:: Content -->
      <div id="kt_content" class="content d-flex flex-column flex-column-fluid">
        <!-- begin:: Content Body -->
        <div class="post d-flex flex-column-fluid">
          <div
            id="kt_content_container"
            class="container-fluid"
          >
            <router-view />
          </div>
        </div>
        <!-- end:: Content Body -->
      </div>
      <!-- end:: Content -->
    </div>
  </div>
  <!-- end:: Body -->
</template>

<script lang="ts">
import { defineComponent, onMounted , watch, nextTick } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import HtmlClass from "@/core/services/LayoutService";
import KTLoader from "@/components/Loader.vue";
import { Actions } from "@/store/enums/StoreEnums";
import { MenuComponent } from "@/assets/ts/components";
import { removeModalBackdrop } from "@/core/helpers/dom";
import { reinitializeComponents } from "@/core/plugins/keenthemes";
import {
  loaderEnabled,
  loaderLogo
} from "@/core/helpers/config";

export default defineComponent({
  name: "theme-layout",
  components: {
    KTLoader,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    // show page loading
    store.dispatch(Actions.ADD_BODY_CLASSNAME, "page-loading");

    // initialize html element classes
    HtmlClass.init();

    onMounted(() => {
      nextTick(() => {
        reinitializeComponents();
      });

      // Simulate the delay page loading
      setTimeout(() => {
        // Remove page loader after some time
        store.dispatch(Actions.REMOVE_BODY_CLASSNAME, "page-loading");
      }, 500);
    });

    watch(
      () => route.path,
      () => {
        MenuComponent.hideDropdowns(undefined);

        nextTick(() => {
          reinitializeComponents();
        });
        removeModalBackdrop();
      }
    );

    return {
      loaderEnabled,
      loaderLogo
    };
  },
});
</script>
