<template>
  <section class="container mx-auto p-1">
    <div class="flex gap-2 mb-6">
      <BackLink/>
      <h2 class="text-2xl">Поиск</h2>
    </div>
    <div class="relative w-full mb-4" :class="{shake : disabled}">
      <input
          ref="filter"
          :placeholder="disabled ? 'Поле не должно быть пустым' : 'Поиск фильмов, сериалов...'"
          class="w-full p-2 bg-gray-900 rounded-2xl py-2 pr-10 pl-4 outline-none flex items-center"
          type="text" v-model="searchValue" @keydown.enter="goToSearch">
      <button v-show="searchValue.length > 0" class="absolute right-20 top-1/2 -translate-y-1/2 mr-1"
              @click="searchValue = ''"><img class="w-4" src="/clear.svg" alt="clear">
      </button>
      <button class="absolute right-0 top-1/2 -translate-y-1/2 bg-orange-600 py-2 px-3 rounded-2xl"
              @click="goToSearch">Найти
      </button>
    </div>
    <SliderList v-if="searchFilms.length > 0" :films="searchFilms"/>
    <!--    <div v-else class="text-lg text-center">По вашему запросу ничего не нашлось</div>-->
  </section>
</template>

<script setup>
import {ref, onMounted, nextTick} from "vue";
import axios from "axios";
import SliderList from "@/components/SliderList.vue";
import BackLink from "@/components/BackLink.vue";

const searchValue = ref('')
const searchFilms = ref([])
const filter = ref(null)
const getItemSearch = async (q) => {
  const {data} = await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${q.trim()}`
      , {
        headers: {
          "X-API-KEY": "9e52d931-b757-457b-a1ea-0d872ae51d51",
          "Content-Type": "application/json",
        },
      })
  searchFilms.value = data.films
  console.log(data.films)
}
const goToSearch = () => {
  if (!searchValue.value || searchValue.value < 2) return warnDisabled()
  getItemSearch(searchValue.value)
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
  nextTick(() => {
    filter.value.focus()
  })
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