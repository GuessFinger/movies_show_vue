<script lang="ts" setup>
</script>

<template>
  <div class="title_container">
    内容展示
  </div>
  <div class="list_container">
    <router-view/>
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
  min-height: 50px;
}

</style>
