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
                            Click on a block to add to your dashboard. You can change the position later.
                        </div>
                    </div>

                    <div style="max-height:270px;padding-right:10px;overflow:auto">
                        <template v-for="(item, index) in items.all" :key="index">
                            <div class="d-grid" v-if="item">
                                <button type="button" @click="addBlock(index)" class="btn d-flex btn-light text-start rounded mb-5">
                                    <Icon :item=item></Icon>
                                    <div class="flex-grow-1 me-2">
                                        <span class="fw-bolder text-gray-800 fs-6">{{ allitems[item.idx].Name }}</span>
                                        <span v-if="item.SubType==='Energy'" class="text-muted fw-bold d-block">{{ allitems[item.idx].Usage }}</span>
                                        <span v-else-if="item.SubType==='Gas'" class="text-muted fw-bold d-block">{{ allitems[item.idx].CounterToday }}</span>
                                        <span v-else-if="item.SubType==='RFXMeter counter'" class="text-muted fw-bold d-block">{{ allitems[item.idx].CounterToday }}</span>
                                        <span v-else class="text-muted fw-bold d-block">{{ allitems[item.idx].Data }}</span>
                                    </div>
                                </button>
                            </div>
                        </template>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Icon from "@/components/includes/Icon.vue";

export default defineComponent({
    name: "add-block",
    components: {
        Icon,
    },
    props: ['items','allitems'],
    setup(props) {

        const addBlock = (id) => {
            delete props.items.all[id];
        }

        return {
            addBlock
        };
    }
});
</script>
