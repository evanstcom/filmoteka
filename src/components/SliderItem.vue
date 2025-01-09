<template>
  <RouterLink :to="{ name: 'item', params: {id: film.kinopoiskId ? film.kinopoiskId : film.filmId}}"
              class="flex flex-col">
    <div class="mb-1 image bg-contain rounded-md"
         :class="size">
      <!--      <div class="mb-1 image bg-contain rounded-md" :style="`background-image: url(${film.posterUrlPreview});`"
               :class="size">-->
      <img class="rounded-md mb-1 h-full w-full" :src="film.posterUrl" :alt="film.nameRu">
    </div>
    <p v-if="film.year && film.genres" class="text-xs text-slate-400 mb-1">{{ film.year }}, {{
        film.genres[0].genre
      }}</p>
    <h3 class="text-xs mb-1">{{ film.nameRu }}</h3>
  </RouterLink>
</template>
<script setup>
import {RouterLink} from "vue-router";

defineProps({
      film: Object,
      size: {
        type: String,
        default: 'w-64 h-96',
        required: false
      }
    }
)
</script>