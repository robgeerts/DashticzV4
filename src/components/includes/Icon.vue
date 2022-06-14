<template>
    <div class="symbol symbol-45px w-40px me-3">
        <span v-if="mode === 'edit'" class="symbol-label" @click="deleteBlock(item.idx)">
            <i class="fa-solid fa-xmark text-danger fs-1"></i>
        </span>
        <span v-else class="symbol-label">
            <i v-if="item.Image === 'Light'" class="fa-solid fa-lightbulb fs-1"></i>
            <i v-else-if="item.Image === 'Fan'" class="fa-solid fa-fan fs-1"></i>
            <i v-else-if="item.Image === 'WallSocket'" class="fa-solid fa-plug fs-1"></i>
            <i v-else-if="item.Image === 'Door' && item.Data === 'Closed'" class="fa-solid fa-door-closed fs-1"></i>
            <i v-else-if="item.Image === 'Door' && item.Data === 'Open'" class="fa-solid fa-door-open fs-1"></i>
            <i v-else-if="item.Image === 'Generic'" class="fa-solid fa-power-off fs-1"></i>
            <i v-else-if="item.SubType === 'Voltage'" class="fa-solid fa-bolt fs-1"></i>
            <i v-else-if="item.HardwareTypeVal===94" class="fa-solid fa-solar-panel fs-1"></i>
            <i v-else-if="item.SubType==='Energy'" class="fa-solid fa-plug fs-1"></i>
            <i v-else-if="item.SubType==='Gas'" class="fa-solid fa-faucet-drip fs-1"></i>
            <i v-else-if="item.HardwareName === 'Smart Gateways Watermeter Gateway'" class="fa-solid fa-fire-flame-simple fs-1"></i>
            <i v-else-if="item.Type==='Temp + Humidity'" class="fa-solid fa-temperature-high fs-1"></i>
            <i v-else-if="item.Type==='Temp + Humidity + Baro'" class="fa-solid fa-temperature-high fs-1"></i>
            <i v-else-if="item.SubType==='SetPoint'" class="fa-solid fa-temperature-arrow-up fs-1"></i>
        </span>
    </div>

</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "icon-block",
    props: ['item','mode'],
    methods: {
        deleteBlock(id){
            alert(id);
        }
    }
});
</script>
