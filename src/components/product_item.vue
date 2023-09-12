<script setup>
import {Swiper, SwiperSlide, useSwiper} from 'swiper/vue';
import {Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import {useRoute} from "vue-router";
import {reactive, watch} from "vue";
import {queryMoviePlots} from "@/axios/requestList.js";

const route = useRoute();
const modules = [Pagination];
const plots = reactive([]);
let swiperObject;

watch(() => route.params.num, () => {
  const {id, num} = route.params;
  getMoviePlot(id, num);
  console.log(swiperObject);
  swiperObject.reachBeginning();
});

const getMoviePlot = async (id, num) => {
  const result = await queryMoviePlots(id, num);
  plots.length = 0;
  if (result.code === 200) {
    plots.push(...result.data);
  }
};

const renderBullet = function (index, className) {
  return '<span class="' + className + '">' + (index + 1) + "</span>";
}



const onSwiper = (swiper) => {
  swiperObject = swiper;
};

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