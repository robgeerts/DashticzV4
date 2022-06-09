<template>

    <div class="modal fade" id="add_blocks" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog mw-650px">
            <div class="modal-content">
                <div class="modal-header pb-0 border-0 justify-content-end">
                    <div class="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal">
                        <i class="fa-solid fa-xmark fs-1"></i>
                    </div>
                </div>

                <div class="modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15">
                    <div class="mb-13">
                        <h1 class="mb-3">Add new block</h1>
                        <div class="text-gray-400 fw-bold fs-5">
                            Enter display name and choose the block you want to add:
                        </div>
                    </div>

                    <label class="fw-bold fs-6">Display name:</label>
                    <input class="form-control form-control-lg form-control-solid mb-3 mb-lg-0" type="text" placeholder="Enter name to display" name="blockname"><br /><br />

                    <label class="fw-bold fs-6">Block:</label>
                    <div style="max-height:270px;padding-right:10px;overflow:auto">
                        <template v-for="(item, index) in items.all" :key="index">
                            <div class="d-flex align-items-center rounded mb-7" style="border:1px solid #ccc;">
                                <Icon :item=item></Icon>
                                <div class="flex-grow-1 me-2">
                                    <span class="fw-bolder text-gray-800 fs-6">{{ item.Name }}</span>
                                    <span v-if="item.SubType==='Energy'" class="text-muted fw-bold d-block">{{ item.Usage }}</span>
                                    <span v-else-if="item.SubType==='Gas'" class="text-muted fw-bold d-block">{{ item.CounterToday }}</span>
                                    <span v-else-if="item.SubType==='RFXMeter counter'" class="text-muted fw-bold d-block">{{ item.CounterToday }}</span>
                                    <span v-else class="text-muted fw-bold d-block">{{ item.Data }}</span>
                                </div>
                            </div>
                        </template>
                    </div>

                    <button type="button" class="btn btn-primary mt-10">Add to dashboard</button>

                </div>
            </div>
        </div>
    </div>

  <div class="row mb-5">
      <div class="col-lg-12">
          <div class="card">
              <div class="card-header border-0">
                  <h3 class="card-title fw-bolder text-dark">Dashticz v4</h3>
                  <button
                      type="button"
                      class="btn btn-sm btn-active-color-primary pe-0"
                      data-bs-toggle="modal"
                      :data-bs-target="`#add_blocks`"
                  >
                      <i class="fa-solid fa-plus fs-1"
                         data-bs-toggle="modal"
                         :data-bs-target="`#add_blocks`"></i>
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
            </div>
            <div class="card-body pt-0">
                <template v-for="(item, index) in items.switches" :key="index">
                    <Switch :id="`block_${item.idx}`" :item=item :mode=mode></Switch>
                </template>
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
                        type="button"
                        class="btn btn-sm btn-icon btn-active-light-primary"
                        data-kt-menu-trigger="click"
                        data-kt-menu-placement="bottom-end"
                        data-kt-menu-flip="top-end"
                    >
                        <i class="fa-solid fa-pencil fs-1"></i>
                    </button>
                </div>
            </div>
            <div class="card-body p-0 d-flex flex-column">
                <Chart chart-height="100" chart-color="primary"></Chart>
            </div>
        </div>
        -->
          <div class="card">
              <div class="card-header border-0">
                  <h3 class="card-title fw-bolder text-dark">Gas/Water/Licht</h3>
              </div>
            <div class="card-body pt-0">
                <template v-for="(item, index) in items.power" :key="index">
                    <Energy :id="`block_${item.idx}`" :item=item :mode=mode></Energy>
                </template>
            </div>
          </div>
      </div>
    <div class="col-lg-4">
          <div class="card mb-5">
              <div class="card-header border-0">
                  <h3 class="card-title fw-bolder text-dark">Overige</h3>
              </div>
              <div class="card-body pt-0">
                  <template v-for="(item, index) in items.others" :key="index">
                      <Temperature :id="`block_${item.idx}`" :item=item :mode=mode></Temperature>
                  </template>
              </div>
          </div>
      </div>
  </div>

</template>

<script lang="ts">
import {defineComponent, reactive } from "vue";
import axios from "axios";

import Switch from "@/components/types/Switch.vue";
import Energy from "@/components/types/Energy.vue";
import Temperature from "@/components/types/Temperature.vue";
import Chart from "@/components/types/Chart.vue";
import Icon from "@/components/includes/Icon.vue";

export default defineComponent({
  name: "main-dashboard",
  components: {
    Switch,
    Energy,
    Temperature,
    //Chart,
    Icon,
  },
  setup() {
        const mode=''; //edit
        const items = reactive({
          switches: {},
          power: {},
          others: {},
          all: {},
        });

        getDevices();
        setInterval(getDevices, 2000);

        function getDevices() {
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
                            console.log(device.Name);
                            console.log(device);
                        }
                    }
                    else {
                      items.all[r]=device;
                    }
                }

            })
        }

        return {
          items,mode
        };

    }
});
</script>
