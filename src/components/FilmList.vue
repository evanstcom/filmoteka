<template>
  <div class="flex flex-col">
    <FilmItem v-for="film in films" :film="film.item ? film.item : film" :size-image="sizeImage" :size-block="sizeBlock"
              :favorite="favorite" :remove="remove"/>
  </div>
</template>

<script setup>
import FilmItem from "@/components/FilmItem.vue";

defineProps({
  films: {
    type: Array,
    required: true
  },
  sizeImage: {
    type: String,
    required: false
  },
  sizeBlock: {
    type: String,
    required: false
  },
  favorite: {
    type: Boolean,
    required: false
  },
  remove: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>

<style lang="scss" scoped>

</style>