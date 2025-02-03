<template>
  <div class="relative flex justify-between">

    <RouterLink :to="{ name: 'item', params: {id: film.id}}" class="relative flex gap-2 w-full mr-10"
    >
      <div class="mb-1 w-14">
        <img :src="film.posterUrl" :alt="film.nameRu">
      </div>
      <div class="flex flex-col w-full">
        <h3 class="text-xs mb-1">{{ film.nameRu }}</h3>
        <div class="flex items-center gap-1">
          <EyeIcon class="w-3 pb-1" alt="home"
                   :class="film.isWatched ? 'text-orange-600' : ''"/>
          <p v-if="film.year && film.genres.length" class="text-xs text-slate-400 mb-1">{{ film.year }}, {{
              film.genres[0].genre
            }}
          </p>
        </div>
      </div>
    </RouterLink>
    <FavoriteSwiper :film="film"/>
  </div>
</template>
<script setup>
import {RouterLink} from "vue-router";
import FavoriteSwiper from "@/components/FavoriteSwiper.vue";
import {EyeIcon} from "@heroicons/vue/24/outline/index.js";

const {film, size} = defineProps({
      film: Object,
      size: {
        type: String,
        default: 'w-64 h-96',
        required: false
      }
    }
)
</script>