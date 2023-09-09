<script setup>
import {reactive, watch} from "vue";
// todo
import {queryPerformerDetailByName} from "@/axios/requestList.js";

const visibleObject = defineProps(['visible', 'performerName']);
defineEmits(['handleOk']);

const performerDetail = reactive({});

const queryPerformerInfo = performerName => {

};

watch(() => visibleObject.performerName, async () => {
  try {
    const result = await queryPerformerDetailByName(visibleObject.performerName);
    console.log(result);
  }catch(error) {
    console.log(error);
  }
  console.log('hello wall');
});

</script>

<template>
  <div>
    <a-modal v-model:open="visibleObject.visible"
             title="Basic Modal"
             @ok="$emit('handleOk')"
             @cancel="$emit('handleOk')">
      <p>Some contents...</p>
      <p>
        {{ visibleObject.performerName }}
      </p>
      <p>Some contents...</p>
    </a-modal>
  </div>
</template>

<style scoped>

</style>