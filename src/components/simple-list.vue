<script setup>
import {onMounted, reactive, ref} from "vue";
import {queryPerformerList} from "../axios/requestList.js";
import performerDetail from './modal/performerDetail.vue'
import {useRouter} from "vue-router";

const router = useRouter();
let savedPerformerList = reactive([]);
let unsavedPerformerList = reactive([]);

onMounted(() => {
  queryPerformer();
});
const queryPerformer = async () => {
  const [savedList, unsavedList] = await queryPerformerList();
  savedPerformerList.length = 0;
  unsavedPerformerList.length = 0;
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

const resetCurrentList = () => {
  visible.value = false;
  queryPerformer();
};

const changeRouter = (performerId) => {
  router.push({name: 'performer', params: {id: performerId}});
};

</script>

<template>
  <!-- 已经存储到数据库的列表 -->
  <div class="saved_performer">
    <div class="title_container">
      saved performer
    </div>
    <div style="display: flex;flex-wrap: wrap;">
      <a-card hoverable style="width: 250px;margin: 10px;"
              v-for="performer in savedPerformerList" :key="performer.id">
        <template #cover>
          <img alt="example" :src="performer.imagePath"
               class="image_item"
               @click="changeRouter(performer.id)"/>
        </template>
        <a-card-meta :title="performer.performerName">
          <template #description>www.cctv.com</template>
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
      @handle-ok="hiddenPerformerDetail"
      @reset-list="resetCurrentList"
  />
</template>

<style scoped>
.title_container {
  font-size: 30px;
  padding: 15px;
}

.saved_performer {
  width: 100%;
  height: 50%;

  .image_item {
    width: 250px;
    height: 340px;
  }

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