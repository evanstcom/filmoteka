<template>
  <section class="container mx-auto p-1 mb-2">
    <h1 class="text-2xl mb-4">{{ item.nameRu ? item.nameRu : item.nameOriginal }}, {{ item.year }}</h1>
    <div class="flex flex-col gap-2 w-full justify-between">
      <p :class="item.ratingKinopoisk > 8 ? 'text-yellow-500' : item.ratingKinopoisk > 7 ? 'text-green-500' : item.ratingKinopoisk > 5 ? 'text-slate-300' : 'text-red-500'"
         class="text-2xl mb-1 font-bold">
        {{ item.ratingKinopoisk ? item.ratingKinopoisk : 'нет рейтинга' }}</p>
      <img class="w-full" :src="item.posterUrl" :alt="item.nameRu ? item.nameRu : item.nameOriginal">
      <div class="">
        <p class="text-slate-400 mb-1 text-md">{{ item.genres.reduce((acc, genre) => acc + ' ' + genre.genre, '') }}</p>
        <!--        <p class="text-slate-400 mb-1 text-xs">{{ item.genres.map((genre) => genre.genre).toString() }}</p>-->
        <p class="text-slate-400 mb-1 text-md">
          {{ item.countries.reduce((acc, country) => acc + ' ' + country.country, '') }}</p>
        <p class="text-slate-300 text-sm mb-1">{{ item.filmLength }} мин.</p>
      </div>
      <div class="mb-4">
        <p class="text-slate-100">{{ item.description }}</p>
      </div>
      <a :href="item.webUrl" class="mt-4 rounded-full bg-orange-400 px-4 py-2 text-center">Смотреть на
        Кинопоиске</a>
    </div>

  </section>
</template>

<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {useRoute} from "vue-router";

const route = useRoute()
const id = route.params.id
const item = ref({
  nameRu: '',
  nameOriginal: '',
  year: '',
  filmLength: '',
  countries: [],
  genres: [],
  ratingKinopoisk: '',
  ratingVoteCount: '',
  posterUrl: '',
  posterUrlPreview: '',
  description: '',
  shortDescription: '',
  webUrl: '',
})
const getItem = async (id) => {
  const {data} = await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`, {
    headers: {
      "X-API-KEY": "9e52d931-b757-457b-a1ea-0d872ae51d51",
      "Content-Type": "application/json",
    },
  })
  item.value = data
  console.log(item.value)
}
onMounted(() => {
  getItem(id)
  console.log(id)
})
</script>

<style lang="scss" scoped>

</style>