<script setup>
import {useFavoritesStore} from "@/stores/favorites.js";
import Title from "@/components/ui/Title.vue";
import ScrollToTop from "@/components/ui/ScrollToTop.vue";
import {onMounted} from "vue";
import FilmList from "@/components/FilmList.vue";

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
    <FilmList :films="favoritesStore.favorites" size-image="w-16" size-block="min-w-16" :favorite="true"/>
    <div class="h-28"></div>
    <ScrollToTop/>
  </section>
</template>