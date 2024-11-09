<template>
  <section class="container mx-auto p-1">
    <div class="flex gap-2 mb-6">
      <BackLink/>
      <h2 class="text-2xl">Поиск</h2>
    </div>
    <div class="relative w-full mb-4">
      <input
          ref="filter"
          placeholder="Поиск фильмов, сериалов..."
          class="w-full p-2 bg-gray-900 rounded-2xl py-2 pr-10 pl-4 outline-none flex items-center"
          type="text" v-model="searchValue" @keydown.enter="goToSearch">
      <button class="absolute right-0 top-1/2 -translate-y-1/2 bg-orange-600 py-2 px-3 rounded-2xl"
              @click="goToSearch">Найти
      </button>
    </div>
    <SliderList :films="searchFilms"/>
  </section>
</template>

<script setup>
import {ref, onMounted, nextTick} from "vue";
import axios from "axios";
import SliderList from "@/components/SliderList.vue";
import BackLink from "@/components/BackLink.vue";

const searchValue = ref('')
const searchFilms = ref([])
const filter = ref(null)
const getItemSearch = async (q) => {
  const {data} = await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${q.trim()}`
      , {
        headers: {
          "X-API-KEY": "9e52d931-b757-457b-a1ea-0d872ae51d51",
          "Content-Type": "application/json",
        },
      })
  searchFilms.value = data.films
}
const goToSearch = () => {
  if (!searchValue.value || searchValue.value < 2) return
  getItemSearch(searchValue.value)
}

onMounted(() => {
  nextTick(() => {
    filter.value.focus()
  })
})
</script>