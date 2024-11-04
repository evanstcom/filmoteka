<template>
  <section class="container mx-auto">
    <h2 class="text-2xl">Поиск</h2>
    <swiper
        :slidesPerView="'auto'"
        :modules="modules"
        class="mySwiper"
    >
      <swiper-slide v-for="film in searchFilms" :key="film.filmId" class="slider__item p-2">
        <RouterLink :to="{ name: 'item', params: {id: film.filmId}}">
          <img class="poster mb-1" :src="film.posterUrl" :alt="film.nameRu">
          <p class="text-xs text-slate-400 mb-1">{{ film.year }}, {{ film.genres[0].genre }}</p>
          <h3 class="text-xs flex-1 mb-1">{{ film.nameRu }}</h3>
        </RouterLink>
      </swiper-slide>
    </swiper>
  </section>
</template>

<script setup>
import {Swiper, SwiperSlide} from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import {Scrollbar, Navigation} from 'swiper/modules';

const modules = [Scrollbar, Navigation]

import {onMounted, ref, watch} from "vue";
import axios from "axios";
import {RouterLink, useRoute} from "vue-router";

const route = useRoute()
const searchFilms = ref([])
const getItemSearch = async (q) => {
  const {data} = await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${q}`
      , {
        headers: {
          "X-API-KEY": "9e52d931-b757-457b-a1ea-0d872ae51d51",
          "Content-Type": "application/json",
        },
      })
  searchFilms.value = data.films
}

onMounted(() => {
  getItemSearch(route.query.q)
})
watch(
    () => route.query.q,
    () => {
      getItemSearch(route.query.q)
    }
)
</script>

<style scoped lang="sass">
.poster
  height: 200px
  border-radius: 4px

.slider__item
  margin-bottom: 16px
  display: flex
  width: 150px
  flex-direction: column
</style>