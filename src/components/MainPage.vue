<template>
  <section class="container mx-auto px-1">
    <h2 class="text-2xl my-2">Премьеры этого месяца</h2>
    <swiper
        :slidesPerView="'auto'"
        :free-mode="true"
        class="mySwiper"
        :freeMode="true"
        :modules="modules"
    >
      <swiper-slide v-for="film in favoriteFilms" :key="film.kinopoiskId" class="slider__item p-2">
        <RouterLink :to="{ name: 'item', params: {id: film.kinopoiskId}}">
          <img class="poster mb-1" :src="film.posterUrl" :alt="film.nameRu">
          <p class="text-xs text-slate-400 mb-1">{{ film.year }}, {{ film.genres[0].genre }}</p>
          <h3 class="text-xs flex-1 mb-1">{{ film.nameRu }}</h3>
        </RouterLink>
      </swiper-slide>
    </swiper>
  </section>
</template>

<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {Swiper, SwiperSlide} from 'swiper/vue';
import {RouterLink} from "vue-router";
import 'swiper/css';
import 'swiper/css/free-mode';
import {FreeMode} from 'swiper/modules';

const modules = [FreeMode]
const favoriteFilms = ref([])

const date = {
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1
}

const month = {
  1: 'january',
  2: 'february',
  3: 'march',
  4: 'april',
  5: 'may',
  6: 'june',
  7: 'july',
  8: 'august',
  9: 'september',
  10: 'october',
  11: 'november',
  12: 'december'
}
const getFavoriteFilms = async () => {
  const {data} = await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=${date.year}&month=${month[date.month]}`, {
    headers: {
      "X-API-KEY": "9e52d931-b757-457b-a1ea-0d872ae51d51",
      "Content-Type": "application/json",
    },
  })

  favoriteFilms.value = data.items
}

onMounted(() => {
  getFavoriteFilms()
})
</script>

<style lang="sass" scoped>
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