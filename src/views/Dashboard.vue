<template>
  <div class="row mb-5">
      <div class="col-lg-12">
          <div class="card">
              <div class="card-header border-0">
                  <h3 class="card-title fw-bolder text-dark">Dashticz v4</h3>
              </div>
          </div>
      </div>
  </div>

  <div class="row gy-5 g-md-5">
    <div class="col-lg-4">
        <div class="card">
            <div class="card-header border-0">
                <h3 class="card-title fw-bolder text-dark">Schakelaars</h3>
            </div>
            <div class="card-body pt-0">
                <template v-for="(item, index) in items.switches" :key="index">
                    <Switch :item=item></Switch>
                </template>
            </div>
        </div>
    </div>
    <div class="col-lg-4">
          <div class="card">
              <div class="card-header border-0">
                  <h3 class="card-title fw-bolder text-dark">Gas/Water/Licht</h3>
              </div>
            <div class="card-body pt-0">
                <template v-for="(item, index) in items.power" :key="index">
                    <Energy :item=item></Energy>
                </template>
            </div>
          </div>
      </div>
    <div class="col-lg-4">
          <div class="card">
              <div class="card-header border-0">
                  <h3 class="card-title fw-bolder text-dark">Overige</h3>
              </div>
              <div class="card-body pt-0">
                  <template v-for="(item, index) in items.all" :key="index">
                      <Temperature :item=item></Temperature>
                  </template>
              </div>
          </div>
      </div>
  </div>

</template>

<script lang="ts">
import {defineComponent, reactive } from "vue";
import Switch from "@/components/Switch.vue";
import Energy from "@/components/Energy.vue";
import Temperature from "@/components/Temperature.vue";
import axios from "axios";

export default defineComponent({
  name: "main-dashboard",
  components: {
    Switch,
    Energy,
    Temperature,
  },
  setup() {
        const items = reactive({
          switches: {},
          power: {},
          all: {},
        });

        getDevices();

        function getDevices() {
          axios.get('http://62.195.183.190:1407/json.htm?type=devices&filter=all&used=true&favorite=1&order=[Order]&plan=0').then(response => {

            for(var r in response.data.result) {
              var device = response.data.result[r];
              if(device.Type=='Light/Switch' || device.Type=='Lighting 1' || device.Type=='Lighting 2'){
                items.switches[r]=device;
              }
              else if(device.Type=='RFXMeter' || device.Type=='P1 Smart Meter'){
                items.power[r]=device;
              }
              else {
                console.log(device.Name);
                console.log(device);
                items.all[r]=device;
              }
            }

          })
        }

        return {
          items
        };

    }
});
</script>
