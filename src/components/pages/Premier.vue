<template>
  <Loading v-if="isLoading"/>
  <section v-else class="relative container mx-auto p-1">
    <div class="flex gap-2 mb-4">
      <BackLink/>
      <Title title="Премьеры этого месяца"/>
    </div>
    <div class="grid-cols-2 grid gap-1">
      <SliderItem :film="film" v-for="film in premiersOnPage" :key="film.kinopoiskId ? film.kinopoiskId : film.filmId"
                  size="w-full h-72"/>
    </div>
    <div class="h-20"></div>
    <ScrollToTop/>
  </section>
</template>

<script setup>
import {onMounted, ref} from "vue";
import Loading from "@/components/Loading.vue";
import SliderItem from "@/components/SliderItem.vue";
import BackLink from "@/components/BackLink.vue";
import {usePremierStore} from "@/stores/premier.js";
import Title from "@/components/Title.vue";
import ScrollToTop from "@/components/ScrollToTop.vue";

const premierStore = usePremierStore()
const premiersOnPage = ref([])
const isLoading = ref(true)


onMounted(async () => {
  if (!premierStore.premiers.length) {
    await premierStore.getPremiers()
    premiersOnPage.value = premierStore.premiers
  } else {
    premiersOnPage.value = premierStore.premiers
  }
  isLoading.value = false
})

</script>