<template>

    <div class="card-px pt-5 pb-10 flex-grow-1">
        <div class="row g-0 mt-5 mb-10">

            <div class="col">
                <div class="d-flex align-items-center me-2">
                    <div class="symbol symbol-50px me-3">
                        <div v-if="mode === 'edit'" class="symbol-label" @click="deleteBlock(4)">
                            <i class="fa-solid fa-xmark text-danger fs-1"></i>
                        </div>
                        <div v-else class="symbol-label">
                            <i class="fa-solid fa-plug fs-1"></i>
                        </div>

                    </div>
                    <div>
                        <div class="fs-4 text-dark fw-bolder">231 Watt</div>
                        <div class="fs-7 text-muted fw-bold">Power</div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="d-flex align-items-center me-2">
                    <div class="symbol symbol-50px me-3">
                        <div v-if="mode === 'edit'" class="symbol-label" @click="deleteBlock(3)">
                            <i class="fa-solid fa-xmark text-danger fs-1"></i>
                        </div>
                        <div v-else class="symbol-label">
                            <i class="fa-solid fa-plug fs-1"></i>
                        </div>
                    </div>
                    <div>
                        <div class="fs-4 text-dark fw-bolder">2.3 kWh</div>
                        <div class="fs-7 text-muted fw-bold">Today</div>
                    </div>
                </div>
            </div>

        </div>
        <div class="row g-0">
            <!--begin::Col-->
            <div class="col">
                <div class="d-flex align-items-center me-2">
                    <div class="symbol symbol-50px me-3">
                        <div v-if="mode === 'edit'" class="symbol-label" @click="deleteBlock(1)">
                            <i class="fa-solid fa-xmark text-danger fs-1"></i>
                        </div>
                        <div v-else class="symbol-label">
                            <i class="fa-solid fa-solar-panel fs-1"></i>
                        </div>
                    </div>
                    <div>
                        <div class="fs-4 text-dark fw-bolder">1.2 Watt p/u</div>
                        <div class="fs-7 text-muted fw-bold">Solar</div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="d-flex align-items-center me-2">
                    <div class="symbol symbol-50px me-3">
                        <div v-if="mode === 'edit'" class="symbol-label" @click="deleteBlock(2)">
                            <i class="fa-solid fa-xmark text-danger fs-1"></i>
                        </div>
                        <div v-else class="symbol-label">
                            <i class="fa-solid fa-solar-panel fs-1"></i>
                        </div>
                    </div>
                    <div>
                        <div class="fs-4 text-dark fw-bolder">8.5 kWh</div>
                        <div class="fs-7 text-muted fw-bold">Today</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <apexchart
        class="mixed-widget-6-chart card-rounded-bottom"
        :options="chartOptions"
        :series="series"
        :height="chartHeight"
        type="area"
    ></apexchart>

</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { getCSSVariableValue } from "@/assets/ts/_utils";

export default defineComponent({
    name: "widget-1",
    props: [
        'mode',
        'chartColor',
        'chartHeight'
    ],
    methods: {
        deleteBlock(id){
            alert(id);
        }
    },
    setup(props) {
        const color = ref(props.chartColor);
        const labelColor = getCSSVariableValue("--bs-" + "gray-800");
        const strokeColor = getCSSVariableValue("--bs-" + "gray-300");
        const baseColor = getCSSVariableValue("--bs-" + color.value);
        const lightColor = getCSSVariableValue("--bs-light-" + color.value);

        const chartOptions = {
            chart: {
                fontFamily: "inherit",
                type: "area",
                height: props.chartHeight,
                toolbar: {
                    show: false,
                },
                zoom: {
                    enabled: false,
                },
                sparkline: {
                    enabled: true,
                },
            },
            plotOptions: {},
            legend: {
                show: false,
            },
            dataLabels: {
                enabled: false,
            },
            fill: {
                type: "solid",
                opacity: 1,
            },
            stroke: {
                curve: "smooth",
                show: true,
                width: 3,
                colors: [baseColor],
            },
            xaxis: {
                categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                labels: {
                    show: false,
                    style: {
                        colors: labelColor,
                        fontSize: "12px",
                    },
                },
                crosshairs: {
                    show: false,
                    position: "front",
                    stroke: {
                        color: strokeColor,
                        width: 1,
                        dashArray: 3,
                    },
                },
                tooltip: {
                    enabled: false,
                },
            },
            yaxis: {
                min: 0,
                max: 60,
                labels: {
                    show: false,
                    style: {
                        colors: labelColor,
                        fontSize: "12px",
                    },
                },
            },
            states: {
                normal: {
                    filter: {
                        type: "none",
                        value: 0,
                    },
                },
                hover: {
                    filter: {
                        type: "none",
                        value: 0,
                    },
                },
                active: {
                    allowMultipleDataPointsSelection: false,
                    filter: {
                        type: "none",
                        value: 0,
                    },
                },
            },
            tooltip: {
                style: {
                    fontSize: "12px",
                },
                y: {
                    formatter: function (val) {
                        return "" + val + " kWh";
                    },
                },
            },
            colors: [lightColor],
            markers: {
                colors: [lightColor],
                strokeColor: [baseColor],
                strokeWidth: 3,
            },
        };

        const series = [
            {
                name: "Yield",
                data: [30.5,40.5,42,50,55,40,23],
            },
        ];

        return {
            series,
            chartOptions,
        };
    },
});
</script>
