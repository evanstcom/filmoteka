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
    <SliderList :films="searchFilms"/>
  </section>
</template>

<script setup>
import {ref, onMounted, nextTick} from "vue";
import axios from "axios";
import SliderList from "@/components/SliderList.vue";

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