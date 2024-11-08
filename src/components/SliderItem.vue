<template>
  <RouterLink :to="{ name: 'item', params: {id: film.kinopoiskId ? film.kinopoiskId : film.filmId}}"
              class="flex w-80 flex-col">
    <img class="h-100 rounded-md mb-1" :src="film.posterUrl" :alt="film.nameRu">
    <p class="text-xs text-slate-400 mb-1">{{ film.year }}, {{ film.genres[0].genre }}</p>
    <h3 class="text-xs flex-1 mb-1">{{ film.nameRu }}</h3>
  </RouterLink>
</template>
<script setup>
import {RouterLink} from "vue-router";

defineProps(({
  film: Object
}))
</script>
