<template>

  <swiper
      :slidesPerView="'auto'"
      :centeredSlides="true"
      :pagination="{
      type: 'progressbar',
    }"
      :navigation="true"
      :spaceBetween="30"
      :modules="modules"
      class="mySwiper mb-8"
  >
    <swiper-slide v-for="item in news" :key="item.kinopoiskId">
      <div class="relative rounded-md overflow-hidden bg-cover h-48 w-full"
           :style="`background-image: url(${item.imageUrl})`">\
        <div class="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <!--        <img class="w-full opacity-50 rounded-md" :src="item.imageUrl" :alt="item.title">-->
        <!--        <p class="absolute bottom-4 left-4 text-xs mb-2">{{ item.description }}</p>-->
        <h2 class="absolute bottom-4 left-4 text-xs w-1/2">{{ item.title }}</h2>
        <a :href="item.url"
           class="absolute bottom-4 right-4 text-xs bg-orange-600 px-4 py-2 rounded-md">Подробнее</a>
      </div>

    </swiper-slide>
  </swiper>
</template>

<script setup>
import {onMounted, ref} from "vue"
import axios from "axios"
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import {Swiper, SwiperSlide} from "swiper/vue"
import {Pagination, Navigation} from 'swiper/modules'

const modules = [Pagination, Navigation]

const news = ref([{
  kinopoiskId: 4008963,
  imageUrl: "https://avatars.mds.yandex.net/get-kinopoisk-post-thumb/1348084/b32d2b292f0654e1a9e80aac5437a33a/orig",
  title: "Вышла «окончательная версия» порнопеплума «Калигула». Как она сделана и почему нам не понравилась",
  description: "На Blu-ray выходит «окончательная версия» (The Ultimate Cut) «Калигулы» Тинто Брасса. Вспоминаем историю создания кровавого порнопеплума и подробно рассказываем про его редукс, максимально близкий к исходному сценарию Гора Видала. ",
  url: "https://www.kinopoisk.ru/api/webview/post/4008963",
  publishedAt: "2024-01-15T13:56:48"

}])

const getNews = async () => {
  const {data} = await axios.get('https://kinopoiskapiunofficial.tech/api/v1/media_posts?page=1', {
    headers: {
      "X-API-KEY": "9e52d931-b757-457b-a1ea-0d872ae51d51",
      "Content-Type": "application/json",
    },
  })
  news.value = data.items
  console.log(data)
}

onMounted(() => {
  getNews()
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