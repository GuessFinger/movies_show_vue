<script setup>
import {Swiper, SwiperSlide} from 'swiper/vue';
import {Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import {onMounted, reactive, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {queryPerformerListById} from "@/axios/requestList.js";
import {performerHotUseStore} from "@/store/degreeOfHeat.js";

const modules = [Pagination];
const router = useRouter();
const route = useRoute();
const productList = reactive([]);
const hotUseStore = performerHotUseStore();

// 获取当前的swiper对象
let swiperObject;

onMounted(() => {
  queryPerformerProductListById(route.params.id);
});

const queryPerformerProductListById = async (id) => {
  const result = await queryPerformerListById(id);
  if (result.code === 200) {
    productList.length = 0;
    productList.push(...result.data);
  }
  if (result.code === 404) {
    alert(result.data);
    await router.push({path: '/'});
  }
};

// 如果通过修改URL的id，需要查看是否有存储过
watch(() => route.params.id, () => {
  queryPerformerProductListById(route.params.id);
});

const showSynopsisPhoto = (num) => {
  router.push({name: 'product', params: {num}});
  hotUseStore.addHot(route.params.id, 3);
};

const onSwiper = (swiper) => {
  swiperObject = swiper;
};

const swiperChange = () => {
  router.push({name: 'performer', params: {id: route.params.id}});
};

</script>
<template>
  <div>
    <router-link to="/">返回首页</router-link>
  </div>
  <div style="height: 550px;">
    <swiper
        :pagination="{dynamicBullets: true}"
        :modules="modules"
        @swiper="onSwiper"
        @slideChange="swiperChange"
        class="mySwiper"
    >
      <swiper-slide v-for="({num,expressImagePath},index) in productList" :key="index">
        <div class="show_container">
          <div class="vertical-text num_item">
            {{ num }}
          </div>
          <div :style="{
            width:'820px',
            height:'100%',
            backgroundImage:'url(' + expressImagePath + ')'}"
               @click="showSynopsisPhoto(num)">
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>

  <router-view/>
</template>

<style scoped>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.vertical-text {
  writing-mode: vertical-lr; /* 从上到下排列文本 */
  text-orientation: upright; /* 保持文本正立 */
  white-space: nowrap; /* 防止文本换行 */
  font-size: 24px; /* 调整文本大小 */
  font-weight: bold; /* 调整文本粗细 */
}

.show_container {
  width: 900px;
  height: 500px;
  display: flex;
}

.num_item {
  width: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid gray;
}


</style>