<template>
  <header class="container mx-auto flex py-4 justify-center items-center gap-4">
    <nav>
      <RouterLink to="/">Go to Home</RouterLink>
    </nav>
    <div>
      <input class="bg-black border border-slate-400 rounded-full px-2 outline-none flex items-center w-full" type="text" v-model="searchValue" @keydown="goToSearch">
    </div>
  </header>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {useRouter, RouterLink} from "vue-router";
const routes = useRouter()
const searchValue = ref( '')
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