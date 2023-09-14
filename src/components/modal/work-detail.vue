<script setup>
import { reactive, watch } from 'vue'
import { queryPerformerDetailByName, savePerformerInfo } from '@/axios/requestList.js'

const visibleObject = defineProps(['visible', 'performerName'])
const emits = defineEmits(['handleOk', 'resetList'])

const productionList = reactive([])
const failLoadList = reactive([])

watch(() => visibleObject.performerName, async () => {
  try {
    const [successList, failList] = await queryPerformerDetailByName(visibleObject.performerName)
    productionList.length = 0
    failLoadList.length = 0
    productionList.push(...successList)
    failLoadList.push(...failList)
  } catch (error) {
    // todo 错误的话，有一个提示
  }
})

const savePerformer = () => {
  savePerformerInfo({
    performerName: visibleObject.performerName,
    productList: productionList
  }).then(res => {
    if (res?.code === 200) {
      // 关闭当前窗口 然后重置查询动作
      emits('resetList')
    }
  })
}

</script>

<template>
  <div>
    <a-modal v-model:open="visibleObject.visible"
             :title="visibleObject.performerName"
             width="800px"
             @ok="savePerformer"
             @cancel="$emit('handleOk')">
      <div>
        <a-list :data-source="productionList" item-layout="vertical">
          <template #renderItem="{ item }">
            <a-list-item>
              <a-list-item-meta
                  :description="item.title"
                  style="width: 100%;"
              >
                <template #title>
                  <a href="https://www.antdv.com/">{{ item.num }}</a>
                </template>
              </a-list-item-meta>
              <div style="display: flex;flex-direction: column;height: 80px;justify-content: space-between">
                <span>发行厂商：{{ item.marker }}</span>
                <span>导演：{{ item.director }}</span>
                <span>发型年份: {{ item.release }}</span>
              </div>
              <div style="padding-top: 10px">
                <a-tag color="red" v-for="(item,index) in item.tag" :key="index">
                  {{ item }}
                </a-tag>
              </div>
            </a-list-item>
          </template>
        </a-list>
      </div>
    </a-modal>
  </div>
</template>

<style scoped>

</style>
