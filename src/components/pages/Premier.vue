<template>
  <Loading v-if="isLoading"/>
  <section v-else class="relative container mx-auto p-1">
    <div class="flex gap-2 mb-4">
      <BackLink/>
      <Title title="Премьеры этого месяца"/>
    </div>
    <div class="relative py-0.5" v-for="film in premierStore.premiers">
      <RouterLink :to="{ name: 'item', params: {id: film.item.kinopoiskId ? film.item.kinopoiskId : film.item.filmId}}"
                  class="flex p-0.5 gap-1 mr-8"
      >
        <div class="mb-1 image bg-contain min-w-12">
          <img class="mb-1 h-full w-12"
               :src="film.item.posterUrlPreview ? film.item.posterUrlPreview : film.item.posterUrl"
               :alt="film.item.nameRu ? film.item.nameRu : film.item.nameEn">
        </div>
        <div class="pr-8">
          <h3 class="text-xs mb-1">{{ film.item.nameRu ? film.item.nameRu : film.item.nameEn }}</h3>
          <h4 v-show="film.item.year && film.item.year !== 'null'" class="text-xs text-slate-400 mb-1">{{
              film.item.year
            }}</h4>
        </div>
      </RouterLink>
    </div>
    <div class="h-20"></div>
    <ScrollToTop/>
  </section>
</template>

<script setup>
import {onMounted, ref} from "vue";
import Loading from "@/components/Loading.vue";
import BackLink from "@/components/BackLink.vue";
import {usePremiersStore} from "@/stores/premiers.js";
import Title from "@/components/Title.vue";
import ScrollToTop from "@/components/ScrollToTop.vue";
import {RouterLink} from "vue-router";

const premierStore = usePremiersStore()
const isLoading = ref(true)


onMounted(() => {
  if (!premierStore.premiers.length) {
    premierStore.getPremiers()
  }
  isLoading.value = false
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})

</script>