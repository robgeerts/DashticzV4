<template>

    <div class="d-grid">
      <button type="button" @click="switchBTN(item.idx,item.Data)" class="btn d-flex btn-light text-start rounded mb-5">

          <Icon :item=item :mode=mode></Icon>

          <div class="flex-grow-1 me-2">
              <span class="fw-bolder text-gray-800 fs-6">{{ item.Name }}</span>
              <span class="text-muted fw-bold d-block">{{ $filters.showDate(item.LastUpdate) }}</span>
          </div>

          <span v-if="item.Data==='On'" class="text-deviceon fw-bolder py-1">{{ item.Data }}</span>
          <span v-else-if="item.Data==='Off'" class="text-default fw-bolder py-1">{{ item.Data }}</span>
          <span v-else class="text-default fw-bolder py-1">{{ item.Data }}</span>
      </button>
    </div>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import Icon from "@/components/includes/Icon.vue";

export default defineComponent({
  name: "switch-block",
  components: {
    Icon,
  },
  props: ['item','mode'],

  setup() {

    const switchBTN = (id,data) => {
      let cmd='On';
      if(data=='On') cmd = 'Off';
      //axios.get(process.env.VUE_APP_DOMOTICZ_URL+'/json.htm?type=command&param=switchlight&idx='+id+'&switchcmd='+cmd+'&level=0&passcode=');
    }
    return {
        switchBTN
    }
  }
});
</script>
