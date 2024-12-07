<template>
  <Loading v-if="isLoading"/>
  <section v-else class="container mx-auto px-1">
    <Title title="Последние новости" :show-all="true" link="news"/>
    <News/>
    <Title title="Премьеры этого месяца" :show-all="true" link="premier"/>
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
import News from "../NewsItem.vue";
import {RouterLink} from "vue-router";

import {usePremierStore} from "@/stores/premier";
import Title from "@/components/Title.vue";

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

