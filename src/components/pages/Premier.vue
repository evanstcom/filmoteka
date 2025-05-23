<template>
  <Loading v-if="premierStore.loader" :full-screen="true"/>
  <section v-else class="relative container mx-auto p-1">
    <div class="flex gap-2 mb-1">
      <BackLink/>
      <Title title="Премьеры этого месяца"/>
    </div>
    <FilmList :films="premierStore.premiers"/>
    <div class="h-28"></div>
    <ScrollToTop/>
  </section>
</template>

<script setup>
import {onMounted} from "vue";
import Loading from "@/components/ui/Loading.vue";
import BackLink from "@/components/ui/BackLink.vue";
import {usePremiersStore} from "@/stores/premiers.js";
import Title from "@/components/ui/Title.vue";
import ScrollToTop from "@/components/ui/ScrollToTop.vue";
import FilmList from "@/components/FilmList.vue";

const premierStore = usePremiersStore()

onMounted(() => {
  if (!premierStore.premiers.length) {
    premierStore.getPremiers()
  }
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})

</script>