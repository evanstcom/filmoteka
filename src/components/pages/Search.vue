<template>
  <metainfo>
    <template v-slot:title/>
  </metainfo>
  <section class="container mx-auto px-1">
    <div class="relative w-full" :class="{shake : disabled}">
      <MagnifyingGlassIcon class="absolute w-5 text-gray-400 top-1/2 -translate-y-1/2 left-3" alt="search"/>
      <XMarkIcon v-show="searchStore.memory.length > 0" @click="() => {
      searchStore.memory = ''
      searchStore.memoryFilms = []
      notFound = false
      }"
                 class="absolute w-5 text-gray-400 top-1/2 -translate-y-1/2 right-3" alt="close"/>
      <input
          :defaultvalue="searchStore.memory"
          :placeholder="disabled ? 'Поле не должно быть пустым' : 'Фильмы, сериалы'"
          class="w-full h-10 px-10 bg-gray-900 bg-opacity-50 py-2 pr-10 outline-none flex items-center text-sm"
          type="text" v-model="searchStore.memory" @keydown.enter="goToSearch"
          @keydown.backspace="searchStore.memoryFilms = []; notFound = false">
      <button v-show="searchStore.memory.length > 0" class="absolute right-20 top-1/2 -translate-y-1/2 mr-1"
              @click="searchValue = ''"></button>
      <!--      <button
                class="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-400 py-2 px-3 rounded-md"
                @click="goToSearch">Найти
            </button>-->
    </div>
    <div v-if="searchStore.memory.length > 0">
      <div v-if="!notFound" v-for="film in searchStore.memoryFilms" v-auto-animate
           class="pt-2 bg-gray-900 bg-opacity-50">
        <SearchItem :film="film"/>
      </div>
      <div v-else>
        <p class="text-center text-sm text-gray-400 mt-4">Ничего не нашлось</p>
      </div>
    </div>
    <div v-else class="bg-gray-900 bg-opacity-50 ">
      <div v-if="searchStore.lastSearch.length > 0">
        <div class="flex items-end justify-between py-3 px-3">
          <h4 class="text-sm text-gray-400  ">Вы недавно искали</h4>
          <span class="text-xs text-gray-400" @click="searchStore.removeAllSearch">Очистить</span>
        </div>
        <div v-for="film in searchStore.lastSearch.slice(0, 7)" v-auto-animate>
          <SearchItem :film="film" :remove="true"/>
        </div>
      </div>
      <!--      <div v-else>
              <p class="text-center text-sm text-gray-400 mt-4">Нет истории поиска</p>
            </div>-->
    </div>
    <div class="h-28 bg-black"></div>
  </section>
</template>

<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {useMeta} from "vue-meta";
import {MagnifyingGlassIcon, XMarkIcon} from "@heroicons/vue/24/outline/index.js";
import SearchItem from "@/components/SearchItem.vue";
import {useSearchStore} from "@/stores/search.js";

const apiKey = import.meta.env.VITE_API_KEY_FILMS
const searchStore = useSearchStore();
const notFound = ref(false)

const getItemSearch = async (q) => {
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
}
const goToSearch = () => {
  if (searchStore.memory.length > 2) {
    getItemSearch(searchStore.memory)
  }
  if (searchStore.memory.length < 2) {
    searchStore.memoryFilms = []
  }
}

//ошибки если инпут пустой
const disabled = ref(false)

/*function warnDisabled() {
  disabled.value = true
  setTimeout(() => {
    disabled.value = false
  }, 1500)
}*/

onMounted(() => {
  /*  nextTick(() => {
      filter.value.focus()
    })*/
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