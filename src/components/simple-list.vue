<script setup>
import {onMounted, reactive, ref} from "vue";
import {queryPerformerList} from "../axios/requestList.js";
import performerDetail from './modal/performerDetail.vue'

let savedPerformerList = reactive([]);
let unsavedPerformerList = reactive([]);

onMounted(() => {
  queryPerformer();
});
const queryPerformer = async () => {
  const [savedList, unsavedList] = await queryPerformerList();
  savedPerformerList.push(...savedList);
  unsavedPerformerList.push(...unsavedList);
};

const visible = ref(false);
const performerName = ref('');
const showPerformerDetail = (name) => {
  visible.value = true;
  performerName.value = name;
};

const hiddenPerformerDetail = () => {
  visible.value = false;
}

</script>

<template>
  <!-- 已经存储到数据库的列表 -->
  <div class="saved_performer">
    <div class="title_container">
      saved performer
    </div>
    <div>
      <a-card hoverable style="width: 240px">
        <template #cover>
          <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>
        </template>
        <a-card-meta title="Europe Street beat">
          <template #description>www.instagram.com</template>
        </a-card-meta>
      </a-card>
    </div>
  </div>
  <!-- 暂时还没有添加到数据库里面  -->
  <div class="unsaved_performer">
    <div class="title_container">
      unsaved performer
    </div>
    <div class="name_container">
      <div v-for="performer in unsavedPerformerList"
           :key="performer"
           class="util_container">
        <a href="#" @click.prevent="showPerformerDetail(performer)">
          {{ performer }}
        </a>
      </div>
    </div>
  </div>

  <performer-detail
      :visible="visible"
      :performer-name="performerName"
      @handle-ok="hiddenPerformerDetail"/>
</template>

<style scoped>
.title_container {
  font-size: 30px;
  padding: 15px;
}

.saved_performer {
  width: 100%;
  height: 50%;
}

.unsaved_performer {
  width: 100%;
  height: 50%;
  padding-top: 25px;

  .name_container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding-top: 30px;

    .util_container {
      width: 20%;
      height: 60px;
      font-size: 20px;
      text-decoration: underline;
      font-family: gue
    }

  }
;

}
</style>