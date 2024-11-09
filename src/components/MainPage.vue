<template>
  <Loading v-if="isLoading"/>
  <section v-else class="container mx-auto px-1">
    <div class="flex justify-between mb-4 items-center">
      <h2 class="text-2xl">Премьеры этого месяца</h2>
      <RouterLink :to="{name:'premier'}" class="text-orange-600 flex gap-1.5 pt-1">
        <span class="text-sm leading-none pb-0.5">все</span>
        <img src="/right_arrow.svg" alt="all" class="w-3">
      </RouterLink>
    </div>
    <SliderList :films="favoritesOnMain"/>
  </section>
</template>

<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import SliderList from "./SliderList.vue";
import Loading from "./Loading.vue";
import {RouterLink} from "vue-router";

const favoritesOnMain = ref([])
const isLoading = ref(true)
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
  favoritesOnMain.value = data.items.slice(0, 20)
  isLoading.value = false
}

onMounted(() => {
  getFavoriteFilms()
})
</script>

