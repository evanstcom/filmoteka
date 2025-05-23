<template>
  <metainfo>
    <template v-slot:title/>
  </metainfo>
  <section class="container mx-auto px-1 text-sm">
    <div class="relative w-full px-0.5 mb-3" :class="{shake : disabled}">
      <MagnifyingGlassIcon class="absolute w-5 text-gray-600 top-1/2 -translate-y-1/2 left-3" alt="search"/>
      <XMarkIcon v-show="searchStore.memory.length > 0" @click="() => {
      searchStore.memory = ''
      searchStore.memoryFilms = []
      notFound = false
      }"
                 class="absolute w-5 text-gray-600 top-1/2 -translate-y-1/2 right-3" alt="close"/>
      <input
          :defaultvalue="searchStore.memory"
          :placeholder="disabled ? 'Поле не должно быть пустым' : 'Фильмы, сериалы'"
          class="w-full h-10 px-10 py-2 pr-10 flex items-center text-sm text-black bg-gray-100 outline-none placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-none sm:text-sm/6 rounded-md"
          type="text" v-model="searchStore.memory" @keydown.enter="goToSearch"
          @keydown.backspace="searchStore.memoryFilms = []; notFound = false">
    </div>
    <div v-if="searchStore.memory.length > 0">
      <Loading v-if="searchStore.loader" :full-screen="false"/>
      <div v-else>
        <FilmList v-if="!notFound" :films="searchStore.memoryFilms" size-image="w-14" size-block="min-w-14"/>
        <div v-else>
          <p class="text-center text-sm text-gray-400 mt-4">Ничего не нашлось</p>
        </div>
      </div>
    </div>
    <div v-else>
      <Loading v-if="searchStore.loader" :full-screen="false"/>
      <div v-else>
        <div v-if="searchStore.lastSearch.length > 0">
          <div class="flex items-end justify-between pb-3 px-1">
            <h4 class="text-sm text-gray-600  ">Вы недавно искали</h4>
            <span class="text-xs text-gray-600" @click="searchStore.removeAllSearch">Очистить</span>
          </div>
          <FilmList :films="searchStore.lastSearch.slice(0, 7)" size-image="w-14" size-block="min-w-14" :remove="true"/>
        </div>
        <div v-else>
          <div class="flex items-end justify-center pb-3 px-1">
            <h4 class="text-sm text-gray-600">История поиска пуста</h4>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="h-28"></div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {useMeta} from "vue-meta";
import {MagnifyingGlassIcon, XMarkIcon} from "@heroicons/vue/24/outline/index.js";
import {useSearchStore} from "@/stores/search.js";
import FilmList from "@/components/FilmList.vue";
import Loading from "@/components/ui/Loading.vue";

const apiKey = import.meta.env.VITE_API_KEY_FILMS
const searchStore = useSearchStore();
const notFound = ref(false)

const getItemSearch = async (q) => {
  searchStore.loader = true
  notFound.value = false
  const {data} = await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${q.trim()}`
      , {
        headers: {
          "X-API-KEY": apiKey,
          "Content-Type": "application/json",
        },
      })
  if (data.films.length === 0) notFound.value = true
  else {
    searchStore.memoryFilms = data.films
    notFound.value = false
  }
  searchStore.loader = false
}
const goToSearch = () => {
  if (!searchStore.memory) return warnDisabled()
  if (searchStore.memory.length > 2) {
    getItemSearch(searchStore.memory)
  }
  if (searchStore.memory.length < 2) {
    searchStore.memoryFilms = []
  }
}

//ошибки если инпут пустой
const disabled = ref(false)

function warnDisabled() {
  disabled.value = true
  setTimeout(() => {
    disabled.value = false
  }, 1500)
}

onMounted(() => {
  searchStore.getLastSearch()
})

useMeta({
  title: 'Поиск',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Поиск фильмов, сериалов...'
    }
  ]
})

</script>

<style scoped lang="scss">
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>