<template>
  <Loading v-if="isLoading"/>
  <section v-else class="container mx-auto px-1">
    <h2 class="text-2xl mb-2">Новости</h2>
    <News/>
    <div class="flex justify-between mb-4 items-center">
      <h2 class="text-2xl">Премьеры этого месяца</h2>
      <RouterLink :to="{name:'premier'}" class="text-orange-600 flex gap-1.5 pt-1">
        <span class="text-sm leading-none pb-0.5">все</span>
        <img src="/right_arrow.svg" alt="all" class="w-3">
      </RouterLink>
    </div>
    <SliderList :films="favoritesOnMain"/>
    <div class="h-20 flex justify-end items-end">
      <RouterLink class="p-4 text-black z-50" to="/pinia">Pinia</RouterLink>
    </div>
  </section>
</template>

<script setup>
import {onMounted, ref} from "vue";
import SliderList from "../SliderList.vue";
import Loading from "../Loading.vue";
import News from "../News.vue";
import {RouterLink} from "vue-router";

import {usePremierStore} from "@/stores/premier";

const isLoading = ref(true)

const premierStore = usePremierStore()
const favoritesOnMain = ref([])

onMounted(async () => {
  if (!premierStore.premiers.length) {
    await premierStore.getPremiers()
    favoritesOnMain.value = premierStore.premiers.slice(0, 20)
  } else {
    favoritesOnMain.value = premierStore.premiers.slice(0, 20)
  }
  isLoading.value = false
})
</script>

