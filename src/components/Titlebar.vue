<template>
    <div class="row mb-5">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header border-0">
                    <h3 class="card-title fw-bolder text-dark">Dashticz v4</h3>
                    <div class="pe-0 pt-5" v-if="settings.mode=='view'">
                        <button type="button" class="btn btn-sm btn-active-color-primary pe-0" @click="switchMode()">
                            <i class="fa-solid fa-pencil fs-1"></i>
                        </button>
                    </div>
                    <div class="pe-0 pt-5" v-if="settings.mode=='edit'">
                        <button type="button" class="btn btn-sm btn-active-color-primary" @click="saveView()">
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
</template>

<script lang="ts">
import {defineComponent, reactive} from "vue";
import axios from "axios";

export default defineComponent({
    name: "title-bar",
    props: ['settings'],
    methods: {
        refreshView() {
            this.$emit('refreshView')
        },
        switchMode() {
            this.$emit('switchMode')
        },
        saveView() {
            this.$emit('saveView')
        },
    }
});
</script>
