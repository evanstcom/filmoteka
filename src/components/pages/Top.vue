<template>
  <Loading v-if="premierStore.loader" :full-screen="true"/>
  <section v-else class="relative container mx-auto p-1">
    <div class="flex gap-2 mb-4">
      <BackLink/>
      <Title title="Топ 250"/>
    </div>
    <Loading v-if="premierStore.loader" :full-screen="true"/>
    <div v-else class="relative py-0.5" v-for="film in premierStore.top250">
      <RouterLink :to="{ name: 'item', params: {id: film.item.kinopoiskId ? film.item.kinopoiskId : film.item.filmId}}"
                  class="flex p-0.5 gap-1 mr-8"
      >
        <div class="mb-1 image bg-contain min-w-12">
          <img class="mb-1 h-full w-12"
               :src="film.item.posterUrlPreview ? film.item.posterUrlPreview : film.item.posterUrl"
               :alt="film.nameRu ? film.item.nameRu : film.item.nameEn">
        </div>
        <div class="pr-8">
          <h3 class="text-xs mb-1">{{ film.item.nameRu ? film.item.nameRu : film.item.nameEn }}</h3>
          <h4 v-show="film.item.year && film.item.year !== 'null'" class="text-xs text-slate-400 mb-1">{{
              film.item.year
            }}</h4>
        </div>
      </RouterLink>
      <div
          :class="!film.item.ratingKinopoisk ? 'bg-slate-300' : film.item.ratingKinopoisk > 8 ? 'bg-yellow-600' : film.item.ratingKinopoisk > 7 ? 'bg-green-600' : film.item.ratingKinopoisk > 5 ? 'bg-slate-600' : 'bg-red-600'"
          class="mb-1 text-xs absolute top-1 right-3 text-white w-6 text-center rounded-sm">
        {{ film.item.ratingKinopoisk && film.item.ratingKinopoisk !== "null" ? film.item.ratingKinopoisk : '' }}
      </div>
    </div>
    <div class="h-32"></div>
    <div class="fixed bottom-20 right-1/2 translate-x-1/2 inline-block bg-gray-900 bg-opacity-50 p-2 rounded-md z-50">
      <vue-awesome-paginate
          :total-items="250"
          :items-per-page="20"
          :max-pages-shown="3"
          v-model="currentPage"
          @click="onClickHandler"
      />
    </div>
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
import {VueAwesomePaginate} from "vue-awesome-paginate";

const premierStore = usePremiersStore()
const currentPage = ref(1)

const onClickHandler = async (page) => {
  await premierStore.getTop250(page)
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
};

onMounted(() => {
  if (!premierStore.top250.length) {
    premierStore.getTop250(1)
  } else {
    currentPage.value = premierStore.currentPage
  }
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})

</script>