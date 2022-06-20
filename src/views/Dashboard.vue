<template>

    <!--<Addblock :items=items :allitems=allitems></Addblock>-->

  <div class="row mb-5">
      <div class="col-lg-12">
          <div class="card">
              <div class="card-header border-0">
                  <h3 class="card-title fw-bolder text-dark">Dashticz v4</h3>
                  <div class="pe-0 pt-5" v-if="mode=='view'">
                      <button type="button" class="btn btn-sm btn-active-color-primary pe-0" @click="switchMode()">
                          <i class="fa-solid fa-pencil fs-1"></i>
                      </button>
                  </div>
                  <div class="pe-0 pt-5" v-if="mode=='edit'">
                      <button type="button" class="btn btn-sm btn-active-color-primary" @click="switchMode()">
                          <i class="fa-solid fa-check fs-1"></i>
                      </button>
                      <button type="button" class="btn btn-sm btn-active-color-primary" @click="switchMode()">
                          <i class="fa-solid fa-xmark fs-1"></i>
                      </button>
                      <button type="button" class="btn btn-sm btn-active-color-primary pe-0" @click="refreshView()">
                          <i class="fa-solid fa-refresh fs-1"></i>
                      </button>
                  </div>
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
                        :key="item"
                        :id="`block_${item}`"
                    >
                        {{ allitems[item] }}
                    </div>
                    <!--
                    <div
                        class="list-group-item p-0 border-0"
                        v-for="item in items.switches"
                        :key="allitems[item].Name"
                        :group="{ name: 'blocks', pull: true, put: true }"
                        :id="`block_${item}`"
                    >
                        <Switch :item=allitems[item] :mode=mode></Switch>
                    </div>-->
                </draggable>
            </div>
        </div>
    </div>
      <!--
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
                        :key="item"
                        :id="`block_${item}`"
                    >
                        <Energy :item=allitems[item] :mode=mode></Energy>
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
                          :key="item"
                          :id="`block_${item}`"
                      >
                          <Temperature :item=allitems[item] :mode=mode></Temperature>
                      </div>
                  </draggable>
              </div>
          </div>
      </div> -->
  </div>

</template>

<script lang="ts">
import {defineComponent, reactive, ref } from "vue";
import { VueDraggableNext } from 'vue-draggable-next'
import axios from "axios";

import Switch from "@/components/types/Switch.vue"; /* eslint-disable vue/no-unused-components */
import Energy from "@/components/types/Energy.vue"; /* eslint-disable vue/no-unused-components */
import Temperature from "@/components/types/Temperature.vue"; /* eslint-disable vue/no-unused-components */
import Chart from "@/components/types/Chart.vue"; /* eslint-disable vue/no-unused-components */
import Addblock from "@/components/modals/Addblock.vue"; /* eslint-disable vue/no-unused-components */

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
  setup() {

      const dragging=false;
      const allitems = reactive({});
      const items = reactive({
          switches: [],
          power: [],
          others: [],
          all: [],
      });

      let mode='view';

      const doneMoving = (event) => {
          console.log('doneMoving');
          console.log('newDraggableIndex = '+event.oldDraggableIndex)
          console.log('oldDraggableIndex = '+event.newDraggableIndex);
          console.log('oldIndex = '+event.oldIndex)
          console.log('newIndex = '+event.newIndex);
      }

      getDevices(true,false);
      //setInterval(getDevices, 2000);

      function getDevices(initial, restart) {
            if(typeof(initial)=='undefined') initial=false;
            if(typeof(restart)=='undefined') restart=false;

            axios.get(process.env.VUE_APP_DOMOTICZ_URL+'/json.htm?type=devices&filter=all&used=true&favorite=0&order=Name&plan=0').then(response => {

                for(var r in response.data.result) {
                    var device = response.data.result[r];
                    allitems[device.idx]=device;

                    items.all[r]=device.idx;
                    if(device.Favorite==1) {
                        if (device.Type == 'Color Switch' || device.Type == 'Light/Switch' || device.Type == 'Lighting 1' || device.Type == 'Lighting 2') {
                            items.switches[r] = device.idx;
                        }
                        else if (device.Type == 'RFXMeter' || device.Type == 'P1 Smart Meter') {
                            //device.Data = device.Data.split(';');
                            //items.power[r] = device.idx;
                        }
                        else {
                           //items.others[r] = device.idx;
                        }
                    }
                    else {
                      if(initial){
                          //items.all[r]=device.idx;
                      }
                    }
                }


                localStorage.setItem('blockItems', JSON.stringify(items));

            })
      }

      function switchMode() {
          if(mode=='view') mode='edit';
          else mode='view';
      }

      function refreshView(){
          if(confirm('Are you sure you want to reset Dashticz and start from scratch?')){
              getDevices(true,true);
          }
      }

      return {
          mode,items,allitems,dragging,doneMoving,refreshView,switchMode
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
