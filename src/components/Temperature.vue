<template>

    <div
        class="d-flex align-items-center rounded mb-7"
    >
        <!--begin::Icon-->
        <span style="width: 50px;">
            <i v-if="item.Type==='Temp + Humidity'" class="fa-solid fa-temperature-high" style="font-size:35px;"></i>
            <i v-else-if="item.SubType==='SetPoint'" class="fa-solid fa-temperature-arrow-up" style="font-size:35px;"></i>
          </span>
        <!--end::Icon-->

        <!--begin::Title-->
        <div class="flex-grow-1 me-2">
            <span
                class="fw-bolder text-gray-800 fs-6"
            >{{ item.Name }}</span
            >

            <span class="text-muted fw-bold d-block">{{ item.LastUpdate }}</span>
        </div>
        <!--end::Title-->

        <!--begin::Lable-->
        <span v-if="item.Type==='Temp + Humidity'" class="fw-bolder py-1">{{ item.Data }}</span>
        <span v-else-if="item.SubType==='SetPoint'" class="fw-bolder py-1">{{ item.Data }}</span>
        <!--end::Lable-->
    </div>

</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "energy-block",
  props: ['item'],
});
</script>
