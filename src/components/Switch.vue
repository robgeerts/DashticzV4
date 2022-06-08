<template>

    <div
        :class="[
            `bg-light-${item.color}`,
          ]"
        class="d-flex align-items-center rounded p-5 mb-7"
    >
        <!--begin::Icon-->
        <span class="me-5">
            <i :class="`fa-regular fa-${item.icon}`" style="font-size:20px;"></i>
          </span>
        <!--end::Icon-->

        <!--begin::Title-->
        <div class="flex-grow-1 me-2">
            <span
                class="fw-bolder text-gray-800 fs-6"
            >{{ item.title }}</span
            >

            <span class="text-muted fw-bold d-block">{{ item.text }}</span>
        </div>
        <!--end::Title-->

        <!--begin::Lable-->
        <span :class="`text-${item.color}`" class="fw-bolder py-1">{{
                item.number
            }}</span>
        <!--end::Lable-->
    </div>

</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "kt-widget-6",
  props: ['item'],
});
</script>
