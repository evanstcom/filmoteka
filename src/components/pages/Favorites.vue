<script setup>
import {useFavoritesStore} from "@/stores/favorites.js";
import Title from "@/components/Title.vue";
import ScrollToTop from "@/components/ScrollToTop.vue";
import {onMounted} from "vue";
import FavoriteItem from "@/components/FavoriteItem.vue";

const favoritesStore = useFavoritesStore()

onMounted(() => {
  if (!favoritesStore.favorites.length) {
    favoritesStore.getFavorites()
  }
})
</script>

<template>
  <section class="relative container mx-auto px-1">
    <Title title="Избранное"/>
    <div class="grid-cols-1 grid gap-1">
      <FavoriteItem :film="film" v-for="film in favoritesStore.favorites"
                    :key="film.id"
                    size="w-full h-72"/>
    </div>
    <div class="h-20"></div>
    <ScrollToTop/>
  </section>
</template>