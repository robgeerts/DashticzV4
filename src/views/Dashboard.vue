<template>

  <div class="row gy-5 g-xl-8">
    <div class="col-lg-4">
        <div class="card">
            <div class="card-header border-0">
                <h3 class="card-title fw-bolder text-dark">Schakelaars</h3>
            </div>
            <div class="card-body pt-0">
                <template v-for="(item, index) in list" :key="index">
                    <Switch :item=item></Switch>
                </template>
            </div>
        </div>
    </div>
    <div class="col-lg-4">
          <div class="card">
              <div class="card-header border-0">
                  <h3 class="card-title fw-bolder text-dark">Schakelaars</h3>
              </div>
              <div class="card-body pt-0">
                  <template v-for="(item, index) in list" :key="index">
                      <Switch :item=item></Switch>
                  </template>
              </div>
          </div>
      </div>
    <div class="col-lg-4">
          <div class="card">
              <div class="card-header border-0">
                  <h3 class="card-title fw-bolder text-dark">Schakelaars</h3>
              </div>
              <div class="card-body pt-0">
                  <template v-for="(item, index) in list" :key="index">
                      <Switch :item=item></Switch>
                  </template>
              </div>
          </div>
      </div>
  </div>

</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import Switch from "@/components/Switch.vue";

export default defineComponent({
  name: "main-dashboard",
  components: {
      Switch,
  },
  setup() {
        const list = ref([
            {
                color: "deviceon",
                icon: "lightbulb",
                title: "Woonkamer",
                text: "8/6/22 18:34",
                number: "ON",
            },
            {
                color: "deviceoff",
                icon: "lightbulb",
                title: "Tuin",
                text: "8/6/22 18:34",
                number: "OFF",
            },
            {
                color: "deviceoff",
                icon: "lightbulb",
                title: "Overkapping",
                text: "8/6/22 18:34",
                number: "OFF",
            },
            {
                color: "deviceon",
                icon: "lightbulb",
                title: "Keuken",
                text: "8/6/22 18:34",
                number: "ON",
            },
        ]);

        return {
            list,
        };
    },
});
</script>
