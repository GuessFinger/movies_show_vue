<script setup>
import {Swiper, SwiperSlide, useSwiper} from 'swiper/vue';
import {Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import {useRoute} from "vue-router";
import {onMounted, reactive, watch} from "vue";
import {queryMoviePlots} from "@/axios/requestList.js";
import {performerHotUseStore} from "@/store/degreeOfHeat.js";

const route = useRoute();
const modules = [Pagination];
const plots = reactive([]);
const hotUseStore = performerHotUseStore();
// 开始计时点
let startSeconds, endSeconds;
// swiper对象
let swiperObject;
// 基准计分点
let baseCount;

const moviePlot = () => {
  const {id, num} = route.params;
  getMoviePlot(id, num);
}

onMounted(() => {
  moviePlot();
});


watch(() => route.params.num, () => {
  moviePlot();
  swiperObject.slideTo(0);
});

const getMoviePlot = async (id, num) => {
  const result = await queryMoviePlots(id, num);
  plots.length = 0;
  if (result.code === 200) {
    baseCount = parseFloat(parseFloat(`${4 / result.data.length}`).toFixed(2));
    plots.push(...result.data);
  }
};

const renderBullet = function (index, className) {
  return '<span class="' + className + '">' + (index + 1) + "</span>";
}

const onSwiper = (swiper) => {
  swiperObject = swiper;
};

// 滑动完成了以后 看一看上一个
const swiperChangeEnd = () => {
  let newSeconds = new Date().getTime();
  if (startSeconds) {
    if (newSeconds - startSeconds > 2000) {
      console.log(baseCount);
      hotUseStore.addHot(route.params.id, baseCount);
    }
  }
  startSeconds = new Date().getTime();
}

</script>

<template>
  <div style="padding: 20px 0;font-size: 25px;">
    电影缩略图
  </div>
  <div style="padding-bottom: 100px;">
    <swiper
        :auto-height="true"
        :pagination="{
            clickable: true,
            renderBullet:renderBullet
        }"
        @swiper="onSwiper"
        @slideChangeTransitionEnd="swiperChangeEnd"
        :modules="modules"
        class="mySwiper"
    >
      <swiper-slide v-for="(item,index) in plots" :key="index">
        <div>
          <img :src="item" alt="" style="max-width: 100%;height: auto;">
        </div>
      </swiper-slide>
    </swiper>
  </div>
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


</style>

<style>
.swiper-pagination-bullet {
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  font-size: 12px;
  color: #000;
  opacity: 1;
  background: rgba(0, 0, 0, 0.2);
}

.swiper-pagination-bullet-active {
  color: #fff;
  background: #007aff;
}
</style>