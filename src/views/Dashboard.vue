<template>
    <div aria-live="polite" aria-atomic="true" class="position-relative">
        <div class="toast-container position-fixed bottom-0 end-0 p-3">
            <div class="toast align-items-center text-white bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        Position of your blocks are saved!
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        </div>
    </div>

  <Addblock :items=items :allitems=allitems></Addblock>
  <Titlebar @switchMode="switchMode" @saveView="saveView" @refreshView="refreshView" :settings=settings></Titlebar>

  <div class="row gy-5 g-md-5">
    <div class="col-lg-4">
        <div class="card mb-5">
            <div class="card-header border-0">
                <h3 class="card-title fw-bolder text-dark">{{ $t('Switches') }}</h3>
                <div class="card-toolbar">
                    <button
                        v-if="settings.mode=='edit'"
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
                        :group="{ name: 'blocks', pull: true, put: true }"
                        :id="`block_${item}`"
                    >
                        <Switch :item=allitems[item] :mode=settings.mode></Switch>
                    </div>
                </draggable>
            </div>
        </div>
    </div>

    <div class="col-lg-4">
      <!--
        <div class="card mb-5">
            <div class="card-header border-0">
                <h3 class="card-title fw-bolder text-dark">Electriciteit</h3>
                <div class="card-toolbar">
                    <button
                        v-if="settings.mode=='edit'"
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
                <Chart chart-height="100" chart-color="primary" :mode=settings.mode></Chart>
            </div>
          </div>-->
          <div class="card">
              <div class="card-header border-0">
                  <h3 class="card-title fw-bolder text-dark">{{ $t('PowerAndGas') }}</h3>
                  <div class="card-toolbar">
                      <button
                          v-if="settings.mode=='edit'"
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
                        <Energy :item=allitems[item] :mode=settings.mode></Energy>
                    </div>
                </draggable>
            </div>
          </div>
      </div>
    <div class="col-lg-4">
          <div class="card mb-5">
              <div class="card-header border-0">
                  <h3 class="card-title fw-bolder text-dark">{{ $t('Others') }}</h3>
                  <div class="card-toolbar">
                      <button
                          v-if="settings.mode=='edit'"
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
                          <Temperature :item=allitems[item] :mode=settings.mode></Temperature>
                      </div>
                  </draggable>
              </div>
          </div>
      </div>
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
import Titlebar from "@/components/Titlebar.vue"; /* eslint-disable vue/no-unused-components */

export default defineComponent({
  name: "main-dashboard",
  components: {
    Switch,
    Energy,
    Temperature,
    Chart,
    Addblock,
    Titlebar,
    draggable: VueDraggableNext,
  },
  setup() {

      const allitems = reactive({});
      const items = reactive({
          switches: {},
          power: {},
          others: {},
          all: {},
      });
      const settings = reactive({
          mode: 'view'
      });

      const doneMoving = (event) => {
          console.log('doneMoving');
          console.log('newDraggableIndex = '+event.oldDraggableIndex)
          console.log('oldDraggableIndex = '+event.newDraggableIndex);
          console.log('oldIndex = '+event.oldIndex)
          console.log('newIndex = '+event.newIndex);
      }

      getDevices(false);
      function getDevices(restart) {
            if(typeof(restart)=='undefined') restart=false;
            axios.get(process.env.VUE_APP_DOMOTICZ_URL+'/json.htm?type=devices&filter=all&used=true&favorite=0&order=Name&plan=0').then(response => {

                for(var r in response.data.result) {
                    var device = response.data.result[r];
                    allitems[device.idx]=device;
                    if(parseInt(device.idx)>0) {
                        if (device.Favorite == 1) {
                            if (device.Type == 'Color Switch' || device.Type == 'Light/Switch' || device.Type == 'Lighting 1' || device.Type == 'Lighting 2') {
                                items.switches[r] = device.idx;
                            } else if (device.Type == 'RFXMeter' || device.Type == 'P1 Smart Meter') {
                                device.Data = device.Data.split(';');
                                items.power[r] = device.idx;
                            } else {
                                items.others[r] = device.idx;
                            }
                        } else {
                            items.all[r] = device.idx;
                        }
                    }
                }


                if(restart || localStorage.getItem('blockItems')==null){
                    localStorage.setItem('blockItems', JSON.stringify(items));
                }
                setTimeout(getDevices, 2500);

            })
      }

      function switchMode() {
          if(settings.mode=='view') settings.mode='edit';
          else settings.mode='view';
      }

      function saveView(){
          settings.mode='view';

      }

      function refreshView(){
          if(confirm('Are you sure you want to reset Dashticz and start from scratch?')){
              getDevices(true);
          }
      }

      return {
          settings,items,allitems,doneMoving,switchMode,saveView,refreshView
      };

    }
});
</script>
