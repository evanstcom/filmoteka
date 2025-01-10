<template>
  <swiper
      :slidesPerView="'auto'"
      :free-mode="true"
      class="mySwiper"
      :freeMode="true"
      :modules="modules"
      :space-between="8"
  >
    <swiper-slide v-for="item in staffList.slice(0, 10)" :key="item.staffId"
                  class="flex-1">
      <StaffItem :staffItem="item"/>
    </swiper-slide>
  </swiper>
</template>
<script setup>
import 'swiper/css';
import 'swiper/css/free-mode';
import {FreeMode} from 'swiper/modules';
import {Swiper, SwiperSlide} from "swiper/vue";
import StaffItem from "@/components/StaffItem.vue";

const modules = [FreeMode]

defineProps({
  staffList: Array
})
</script>
