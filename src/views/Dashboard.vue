<template>

    <Addblock :items=items></Addblock>

  <div class="row mb-5">
      <div class="col-lg-12">
          <div class="card">
              <div class="card-header border-0">
                  <h3 class="card-title fw-bolder text-dark">Dashticz v4</h3>
                  <button v-if="mode=='view'" type="button" class="btn btn-sm btn-active-color-primary pe-0" @click="switchMode()">
                      <i class="fa-solid fa-pencil fs-1"></i>
                  </button>
                  <button v-if="mode=='edit'" type="button" class="btn btn-sm btn-active-color-primary pe-0" @click="switchMode()">
                      <i class="fa-solid fa-xmark fs-1"></i>
                  </button>
              </div>
          </div>
      </div>
  </div>

  <div class="row gy-5 g-md-5">
    <div class="col-lg-4">
        <div class="card mb-5">
            <div class="card-header border-0">
                <h3 class="card-title fw-bolder text-dark">Schakelaars</h3>
                <div class="card-toolbar">
                    <button
                        v-if="mode=='edit'"
                        type="button"
                        class="btn btn-sm btn-active-color-primary pe-0"
                        data-bs-toggle="modal"
                        :data-bs-target="`#add_blocks`"
                    >
                        <i class="fa-solid fa-plus fs-1"></i>
                    </button>
                </div>
            </div>
            <div class="card-body pt-0">
                <draggable id="col1" class="dragArea list-group w-full" @end="doneMoving">
                    <div
                        class="list-group-item p-0 border-0"
                        v-for="item in items.switches"
                        :key="item.Name"
                        :group="{ name: 'blocks', pull: true, put: true }"
                        :id="`block_${item.idx}`"
                    >
                        <Switch :item=item :mode=mode></Switch>
                    </div>
                </draggable>
            </div>
        </div>
    </div>
    <div class="col-lg-4">
        <div class="card mb-5">
            <div class="card-header border-0">
                <h3 class="card-title fw-bolder text-dark">Electriciteit</h3>
                <div class="card-toolbar">
                    <button
                        v-if="mode=='edit'"
                        type="button"
                        class="btn btn-sm btn-active-color-primary pe-0"
                        data-bs-toggle="modal"
                        :data-bs-target="`#add_blocks`"
                    >
                        <i class="fa-solid fa-plus fs-1"></i>
                    </button>
                </div>
            </div>
            <div class="card-body p-0 d-flex flex-column">
                <Chart chart-height="100" chart-color="primary" :mode=mode></Chart>
            </div>
        </div>
          <div class="card">
              <div class="card-header border-0">
                  <h3 class="card-title fw-bolder text-dark">Gas/Water/Licht</h3>
                  <div class="card-toolbar">
                      <button
                          v-if="mode=='edit'"
                          type="button"
                          class="btn btn-sm btn-active-color-primary pe-0"
                          data-bs-toggle="modal"
                          :data-bs-target="`#add_blocks`"
                      >
                          <i class="fa-solid fa-plus fs-1"></i>
                      </button>
                  </div>
              </div>
            <div class="card-body pt-0">
                <draggable id="col2" class="dragArea list-group w-full" @end="doneMoving">
                    <div
                        class="list-group-item p-0 border-0"
                        v-for="item in items.power"
                        :group="{ name: 'blocks', pull: true, put: true }"
                        :key="item.Name"
                        :id="`block_${item.idx}`"
                    >
                        <Energy :item=item :mode=mode></Energy>
                    </div>
                </draggable>
            </div>
          </div>
      </div>
    <div class="col-lg-4">
          <div class="card mb-5">
              <div class="card-header border-0">
                  <h3 class="card-title fw-bolder text-dark">Overige</h3>
                  <div class="card-toolbar">
                      <button
                          v-if="mode=='edit'"
                          type="button"
                          class="btn btn-sm btn-active-color-primary pe-0"
                          data-bs-toggle="modal"
                          :data-bs-target="`#add_blocks`"
                      >
                          <i class="fa-solid fa-plus fs-1"></i>
                      </button>
                  </div>
              </div>
              <div class="card-body pt-0">
                  <draggable id="col3" class="dragArea list-group w-full" @end="doneMoving">
                      <div
                          class="list-group-item p-0 border-0"
                          v-for="item in items.others"
                          :group="{ name: 'blocks', pull: true, put: true }"
                          :key="item.Name"
                          :id="`block_${item.idx}`"
                      >
                          <Temperature :item=item :mode=mode></Temperature>
                      </div>
                  </draggable>
              </div>
          </div>
      </div>
  </div>

</template>

<script lang="ts">
import {defineComponent, reactive } from "vue";
import { VueDraggableNext } from 'vue-draggable-next'
import axios from "axios";

import Switch from "@/components/types/Switch.vue";
import Energy from "@/components/types/Energy.vue";
import Temperature from "@/components/types/Temperature.vue";
import Chart from "@/components/types/Chart.vue";
import Addblock from "@/components/modals/Addblock.vue";

export default defineComponent({
  name: "main-dashboard",
  components: {
    Switch,
    Energy,
    Temperature,
    Chart,
    Addblock,
    draggable: VueDraggableNext,
  },
    data(){
      return {
          mode:'view'
      }
    },
  methods: {
    switchMode() {
        if(this.mode=='view') this.mode='edit';
        else this.mode='view';
    }
  },
  setup() {

      const dragging=false;
      const items = reactive({
          switches: {},
          power: {},
          others: {},
          all: {},
      });

      const doneMoving = (event) => {
          console.log('doneMoving');
          console.log('newDraggableIndex = '+event.oldDraggableIndex)
          console.log('oldDraggableIndex = '+event.newDraggableIndex);
          console.log('oldIndex = '+event.oldIndex)
          console.log('newIndex = '+event.newIndex);
      }

      getDevices(true);
      //setInterval(getDevices, 2000);

      function getDevices(initial) {
            if(typeof(initial)=='undefined') initial=false;
            axios.get(process.env.VUE_APP_DOMOTICZ_URL+'/json.htm?type=devices&filter=all&used=true&favorite=0&order=Name&plan=0').then(response => {

                for(var r in response.data.result) {

                    var device = response.data.result[r];
                    if(device.Favorite==1) {
                        if (device.Type == 'Color Switch' || device.Type == 'Light/Switch' || device.Type == 'Lighting 1' || device.Type == 'Lighting 2') {
                            items.switches[r] = device;
                        } else if (device.Type == 'RFXMeter' || device.Type == 'P1 Smart Meter') {
                            device.Data = device.Data.split(';');
                            items.power[r] = device;
                        } else {
                            items.others[r] = device;
                        }
                    }
                    else {
                      if(initial) items.all[r]=device;
                    }
                }

            })
      }

      return {
          items,dragging,doneMoving
      };

    }
});
</script>

<style>
.d-grid button {
}
.sortable-chosen.ghost .d-grid button {
    background-color:#dcdcdd !important;
}
</style>
