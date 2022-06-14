<template>

    <div class="d-grid">
      <button type="button" class="btn d-flex btn-light text-start rounded mb-3">

        <Icon :item=item :mode=mode></Icon>

        <div class="flex-grow-1 me-2">
            <span class="fw-bolder text-gray-800 fs-6">{{ item.Name }}</span>
            <span class="text-muted fw-bold d-block">{{ $filters.showDate(item.LastUpdate) }}</span>
        </div>

        <span v-if="item.SubType==='Energy'" class="fw-bolder py-1">{{ item.Data[4]-item.Data[5] }} Watt</span>
        <span v-else-if="item.SubType==='Gas'" class="fw-bolder py-1">{{ item.CounterToday }}</span>
        <span v-else-if="item.SubType==='RFXMeter counter'" class="fw-bolder py-1">{{ item.CounterToday }}</span>
      </button>
    </div>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import Icon from "@/components/includes/Icon.vue";
export default defineComponent({
    name: "energy-block",
    components: {
        Icon,
    },
    props: ['item','mode'],
});
</script>