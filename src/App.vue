<script lang="ts" setup>
import SimpleList from "./components/simple-list.vue";

</script>


<template>
  <div class="title_container">
    获取的内容展示
  </div>
  <div class="list_container">
    <simple-list/>
  </div>
</template>


<style scoped>
.title_container {
  margin-top: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  height: 100px;
}

.list_container {
  width: 100%;
  margin: 50px;
  border: 1px solid red;
  min-height: 50px;
}

</style>
