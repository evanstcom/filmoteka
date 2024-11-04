<template>
  <section class="container mx-auto -mt-4">
    <div class="flex flex-col gap-2 w-full justify-between">
      <img class="w-full" :src="item.posterUrl" :alt="item.nameRu ? item.nameRu : item.nameOriginal">
      <h1 class="text-2xl mb-2 text-center">{{ item.nameRu ? item.nameRu : item.nameOriginal }}</h1>
      <div class="self-center">
        <div class="text-slate-400 text-sm text-center mb-2">
          <p
              :class="!item.ratingKinopoisk ? 'text-slate-300' : item.ratingKinopoisk > 8 ? 'text-yellow-700' : item.ratingKinopoisk > 7 ? 'text-green-500' : item.ratingKinopoisk > 5 ? 'text-slate-300' : 'text-red-500'"
              class="mb-1 font-bold">
            {{ item.ratingKinopoisk ? item.ratingKinopoisk : 'нет рейтинга' }} </p>
          {{ item.genres.reduce((acc, genre) => acc + ' ' + genre.genre, '') }}
          <!--        <p class="text-slate-400 mb-1 text-xs">{{ item.genres.map((genre) => genre.genre).toString() }}</p>-->
          <p class="text-slate-400 mb-1 text-sm text-center">
            {{ item.countries.reduce((acc, country) => acc + ' ' + country.country, '') }}</p>
          <p class="text-slate-100 text-md mb-1 text-center">{{ item.filmLength }} мин.</p>
        </div>
      </div>
      <div class="flex items-center justify-center">
        <a :href="item.webUrl" class="my-2 rounded-full bg-orange-600 px-4 py-4 text-center">Смотреть на
          Кинопоиске</a>

      </div>
      <div class=" bg-white px-2 py-4">
        <p class="text-slate-300 text-sm font-bold text-black mb-2">{{ item.shortDescription }}</p>
        <p class="text-slate-300 text-sm  text-black">{{ item.description }}</p>
      </div>
    </div>
    <div class="bg-white flex flex-col gap-2 w-full p-2">
      <h2 class="text-black text-xl bold">Рейтинг Кинопоиска</h2>
      <div class="flex flex-col items-center justify-center bg-slate-200 py-4 rounded-md w-full self-center">
        <span
            :class="!item.ratingKinopoisk ? 'text-slate-300' : item.ratingKinopoisk > 8 ? 'text-yellow-500' : item.ratingKinopoisk > 7 ? 'text-green-500' : item.ratingKinopoisk > 5 ? 'text-slate-300' : 'text-red-500'"
            class="mb-1 text-5xl font-bold">
           {{ item.ratingKinopoisk ? item.ratingKinopoisk : 'нет рейтинга' }}</span>
        <div class="text-slate-800 text-sm text-center mb-2">
          {{ item.ratingKinopoiskVoteCount }} оценок
        </div>
        <a :href="item.webUrl" class="my-2 rounded-full bg-orange-600 px-12 py-4 text-center font-bold">Оценить</a>
      </div>
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
  ratingKinopoiskVoteCount: '',
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