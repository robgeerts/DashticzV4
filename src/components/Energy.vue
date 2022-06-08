<template>

    <div
        class="d-flex align-items-center rounded mb-7"
    >
        <!--begin::Icon-->
        <span style="width: 50px;">
            <i v-if="item.SubType==='Energy'" class="fa-solid fa-plug" style="font-size:35px;"></i>
            <i v-else-if="item.SubType==='Gas'" class="fa-solid fa-faucet-drip" style="font-size:35px;"></i>
            <i v-else-if="item.HardwareName === 'Smart Gateways Watermeter Gateway'" class="fa-solid fa-fire-flame-simple" style="font-size:35px;"></i>
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
        <span v-if="item.SubType==='Energy'" class="fw-bolder py-1">{{ item.Usage }}</span>
        <span v-if="item.SubType==='Gas'" class="fw-bolder py-1">{{ item.CounterToday }}</span>
        <span v-if="item.SubType==='RFXMeter counter'" class="fw-bolder py-1">{{ item.CounterToday }}</span>
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
