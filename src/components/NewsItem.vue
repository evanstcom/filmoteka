<template>
  <swiper
      :slidesPerView="'auto'"
      :centeredSlides="true"
      :pagination="{
      type: 'progressbar'
    }"
      :navigation="false"
      :spaceBetween="30"
      :modules="modules"
      class="mySwiper mb-4"
  >
    <swiper-slide v-for="news in newsStore.newsOnMain" :key="news.item.kinopoiskId">
      <div class="overflow-hidden bg-cover h-48 w-full"
           :style="`background-image: url(${news.item.imageUrl})`">
        <div class="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
        <h2 class="absolute bottom-4 left-4 text-xs w-1/2 text-white">{{ news.item.title }}</h2>
        <a :href="news.item.url"
           class="absolute bottom-4 right-4 text-xs bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-400 px-4 py-2 rounded-md text-white">Подробнее</a>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script setup>
import {onMounted} from "vue"
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import {Swiper, SwiperSlide} from "swiper/vue"
import {Pagination, Navigation} from 'swiper/modules'
import {useNewsStore} from "@/stores/news.js";

const modules = [Pagination, Navigation]
const newsStore = useNewsStore()

onMounted(() => {
  if (!newsStore.newsOnMain.length) {
    newsStore.getLastNews()
  }
})
</script>

<style lang="sass">

.swiper-button-prev, .swiper-button-next
  font-size: 10px

.swiper-button-prev:after, .swiper-button-next:after
  font-size: 10px
  color: white
  width: 16px
  height: 16px
  border-radius: 50%


.swiper-pagination-progressbar .swiper-pagination-progressbar-fill
  background: orangered

</style>