<script setup>
import {watch} from "vue";

const visibleObject = defineProps(['visible', 'performerName']);
defineEmits(['handleOk']);

watch(() => visibleObject.performerName, () => {
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