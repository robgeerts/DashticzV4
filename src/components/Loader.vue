<template>
  <template>
    <div class="page-loader flex-column">
      <img alt="Logo" class="max-h-75px" :src="logo" />

      <div class="d-flex align-items-center mt-5">
        <span class="spinner-border text-primary" role="status"></span>
        <span class="text-muted fs-6 fw-bold ms-5">Loading...</span>
      </div>
    </div>
  </template>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "theme-loader",
  props: {
    logo: String,
  }
});
</script>
