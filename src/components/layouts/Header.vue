<template>
  <header class="container mx-auto flex py-1 justify-between items-center gap-4 p-1 mb-4 filter drop-shadow-xl">
    <div class="relative w-full">
      <input
          class="bg-black border border-white rounded-sm py-2 px-10 outline-none flex items-center w-full"
          type="text" v-model="searchValue" @keydown="goToSearch">
      <img src="/search.svg" alt="search" class="absolute left-2 top-1/2 -translate-y-1/2 w-6">
      <nav>
        <RouterLink class="text-black absolute right-2 top-1/2 -translate-y-1/2" to="/" @click="refreshInput">
          <img alt="home" class="w-6 " src='/home.svg'>
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {useRouter, RouterLink} from "vue-router";

const routes = useRouter()
const searchValue = ref('')

const refreshInput = () => {
  searchValue.value = ''
}
const goToSearch = () => {
  setTimeout(
      () => {
        if (searchValue.value === '') {
          routes.push({name: 'main'})
        } else {
          routes.push({name: 'search', query: {q: searchValue.value}})
        }
      }, 1500
  )
}

onMounted(() => {
  if (searchValue.value === '') {
    routes.push({name: 'main'})
  } else {
    goToSearch()
  }
})
</script>

<style lang="sass" scoped>

</style>