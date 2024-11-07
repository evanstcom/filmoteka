<template>
  <section class="container mx-auto">
    <h2 class="text-2xl px-1 my-2">Поиск</h2>
    <div class="relative w-full p-1">
      <input
          ref="filter"
          placeholder="Поиск фильмов, сериалов..."
          class="w-full p-2 bg-gray-700 bg-opacity-50 rounded-full py-1 pr-10 pl-4 outline-none flex items-center transition-all duration-500"
          type="text" v-model="searchValue" @keydown.enter="goToSearch">
      <button class="absolute right-0 top-1/2 -translate-y-1/2 mr-1 bg-orange-600 py-1 px-3 rounded-full"
              @click="goToSearch">Найти
      </button>
    </div>
    <swiper
        :slidesPerView="'auto'"
        :free-mode="true"
        class="mySwiper"
        :freeMode="true"
        :modules="modules"
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
import 'swiper/css/free-mode';
import {FreeMode} from 'swiper/modules';
import {ref, onMounted, nextTick} from "vue";
import axios from "axios";
import {RouterLink} from "vue-router";

const modules = [FreeMode]
const searchValue = ref('')
const searchFilms = ref([])
const filter = ref(null)
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
const goToSearch = () => {
  getItemSearch(searchValue.value)
}

onMounted(() => {
  nextTick(() => {
    filter.value.focus()
  })
})
</script>

<style scoped lang="sass">
.poster
  border-radius: 4px
  height: 400px
  flex: 1

.slider__item
  margin-bottom: 16px
  display: flex
  width: 300px
  flex-direction: column
</style>