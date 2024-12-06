<template>
  <Loading v-if="isLoading"/>
  <section v-else class="relative container mx-auto p-1">
    <div class="flex gap-2 mb-4">
      <BackLink/>
      <h2 class="text-2xl">Премьеры этого месяца</h2>
    </div>
    <div class="grid-cols-2 grid gap-1">
      <SliderItem :film="film" v-for="film in premiersOnPage" :key="film.kinopoiskId ? film.kinopoiskId : film.filmId"
                  size="w-full h-72"/>
    </div>
    <div class="h-20"></div>
    <div class="fixed bottom-20 right-4 inline-block bg-gray-900 opacity-80 p-2 rounded-md z-50"
         @click="goToTop"
         v-show="isVisible"
    >
      <img src="/right_arrow.svg" alt="back" class="-rotate-90 w-4">
    </div>
  </section>
</template>

<script setup>
import {onMounted, ref} from "vue";
import Loading from "@/components/Loading.vue";
import SliderItem from "@/components/SliderItem.vue";
import BackLink from "@/components/BackLink.vue";
import {usePremierStore} from "@/stores/premier.js";

const premierStore = usePremierStore()
const premiersOnPage = ref([])
const isLoading = ref(true)
const isVisible = ref(false)
const lastScrollY = ref(0)

const handleScroll = () => {
  const currentScrollY = window.scrollY
  isVisible.value = currentScrollY > lastScrollY.value
  lastScrollY.value = currentScrollY
}

const goToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(async () => {
  if (!premierStore.premiers.length) {
    await premierStore.getPremiers()
    premiersOnPage.value = premierStore.premiers
  } else {
    premiersOnPage.value = premierStore.premiers
  }
  handleScroll()
  isLoading.value = false
})

</script>