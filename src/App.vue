<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "app"
});
</script>

<style lang="scss">
@import "~@fortawesome/fontawesome-free/css/all.css";

@import "assets/sass/plugins";
@import "assets/sass/style";
</style>
