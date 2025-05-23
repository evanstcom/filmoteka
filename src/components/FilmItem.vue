<template>
  <div class="relative">
    <div class="flex justify-between">
      <RouterLink
          :to="{ name: 'item', params: {id: film.kinopoiskId ? film.kinopoiskId : film.filmId ? film.filmId : film.id}}"
          class="flex p-0.5 gap-2 mr-8 flex-1"
          @click="!remove ? searchStore.addToLastSearch(film, film.kinopoiskId ? film.kinopoiskId : film.filmId) : null"
      >
        <div class="image bg-contain" :class="sizeBlock">
          <img class="h-full" :class="sizeImage"
               :src="film.posterUrlPreview ? film.posterUrlPreview : film.posterUrl"
               :alt="film.nameRu ? film.nameRu : film.nameEn">
        </div>
        <div class="mr-8">
          <h3 class="text-xs mb-1">{{ film.nameRu ? film.nameRu : film.nameEn }}</h3>
          <div class="flex gap-1.5">
            <EyeIcon v-show="favorite" class="w-3 pb-1" alt="home"
                     :class="film.isWatched ? 'text-orange-600' : ''"/>
            <h4 v-show="film.year && film.year !== 'null'" class="text-xs text-slate-400 mb-1">{{
                film.year
              }}</h4>
          </div>
        </div>
      </RouterLink>
      <FavoriteSwiper v-if="favorite" :film="film"/>
    </div>
    <div v-if="film.ratingKinopoisk"
         :class="!film.ratingKinopoisk ? 'bg-slate-300' : film.ratingKinopoisk > 8 ? 'bg-yellow-600' : film.ratingKinopoisk > 7 ? 'bg-green-600' : film.ratingKinopoisk > 5 ? 'bg-slate-600' : 'bg-red-600'"
         class="mb-1 text-xs absolute top-1 right-2 text-white w-6 text-center rounded-sm">
      {{ film.ratingKinopoisk && film.ratingKinopoisk !== "null" ? film.ratingKinopoisk : '' }}
    </div>
    <div v-else-if="film.rating"
         :class="film.rating === 'null' ? 'bg-slate-300' : film.rating > 8 ? 'bg-yellow-600' : film.rating > 7 ? 'bg-green-600' : film.rating > 5 ? 'bg-slate-600' : 'bg-red-600'"
         class="mb-1 text-xs absolute top-1 right-2 text-white w-6 text-center rounded-sm">
      {{ film.rating && film.rating !== "null" ? film.rating : '-' }}
    </div>
    <XMarkIcon class="absolute w-7 p-1 text-gray-400 top-1/2 -translate-y-1/2 right-0" alt="close" v-show="remove"
               @click="searchStore.removeFromSearch(film.filmId ? film.kinopoiskId : film.id)"/>
  </div>
</template>

<script setup>

import {RouterLink} from "vue-router";
import FavoriteSwiper from "@/components/ui/FavoriteSwiper.vue";
import {EyeIcon, XMarkIcon} from "@heroicons/vue/24/outline/index.js";
import {useSearchStore} from "@/stores/search.js";

const searchStore = useSearchStore()

defineProps({
  film: {
    type: Object,
    required: true,
  },
  sizeImage: {
    type: String,
    default: 'w-16',
    required: false
  },
  sizeBlock: {
    type: String,
    default: 'min-w-16',
    required: false
  },
  favorite: {
    type: Boolean,
    required: false
  },
  remove: {
    type: Boolean,
    required: false
  }
})
</script>

<style lang="scss" scoped>

</style>