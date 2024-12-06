<template>
  <Loading v-if="isLoading"/>
  <section v-else class="container mx-auto pb-4">
    <div class="fixed z-50 top-4 left-4">
      <BackLink/>
    </div>
    <div class="flex flex-col gap-2 w-full justify-between">
      <div class="relative">
        <img class="w-full" :src="item.posterUrl" :alt="item.nameRu ? item.nameRu : item.nameOriginal">
        <div
            class="absolute top-0 w-full  h-16 bg-gradient-to-b from-black to-transparent flex items-end justify-around p-2">
        </div>
        <div
            class="absolute bottom-0 w-full  h-24 bg-gradient-to-t from-black to-transparent flex items-end justify-around p-2">
          <div v-if="item.startYear" class="text-sm">{{ item.startYear }}-{{
              item.endYear ? item.endYear : "н.в."
            }}
          </div>
          <div v-else class="text-sm">{{ item.year }}</div>
          <div v-if="item.filmLength" class="text-slate-300 text-sm">{{
              item.filmLength
            }} мин.
          </div>
          <div v-if="item.has3D" class="text-yellow-500 text-sm font-semibold">
            3D
          </div>
          <div v-else class="text-orange-500 text-sm font-semibold">
            2D
          </div>
          <div v-if="item.ratingAgeLimits" class="text-white text-sm font-semibold">{{
              item.ratingAgeLimits.split('age')[1]
            }}+
          </div>
        </div>
      </div>
      <h1 class="text-2xl mb-2 text-center">{{ item.nameRu ? item.nameRu : item.nameOriginal }}</h1>
      <div class="self-center">
        <div class="text-slate-400 text-sm text-center mb-2">
          <p
              :class="!item.ratingKinopoisk ? 'text-slate-300' : item.ratingKinopoisk > 8 ? 'text-yellow-700' : item.ratingKinopoisk > 7 ? 'text-green-500' : item.ratingKinopoisk > 5 ? 'text-slate-300' : 'text-red-500'"
              class="mb-1 font-bold">
            {{ item.ratingKinopoisk ? item.ratingKinopoisk : 'нет рейтинга' }} </p>
          {{ item.genres.reduce((acc, genre) => acc + ' ' + genre.genre, '') }}
          <!--        <p class="text-slate-400 mb-1 text-xs">{{ item.genres.map((genre) => genre.genre).toString() }}</p>-->
          <p class="text-slate-400 mb-1 text-sm text-center">
            {{ item.countries.reduce((acc, country) => acc + ' ' + country.country, '') }}</p>
          <p v-if="item.filmLength" class="text-slate-100 text-md mb-1 text-center">{{ item.filmLength }} мин.</p>
        </div>
      </div>
      <div class="flex items-center justify-center">
        <a :href="item.webUrl" class="my-2 rounded-full bg-orange-600 px-4 py-4 text-center">Смотреть на
          Кинопоиске</a>

      </div>
    </div>
  </section>
  <section class="bg-white">
    <div class="container mx-auto bg-white flex flex-col gap-2 w-full px-2 pt-2 pb-8">
      <div class=" bg-white py-4">
        <p class="text-black text-sm font-bold mb-2">{{ item.shortDescription }}</p>
        <p class="text-black text-sm">{{ item.description }}</p>
      </div>
      <h2 class="text-black text-xl bold">Рейтинг Кинопоиска</h2>
      <div class="flex flex-col items-center justify-center bg-slate-200 py-4 rounded-md w-full self-center gap-2">
        <span
            v-if="!item.ratingKinopoisk"
            class="text-md text-slate-600 font-bold">нет рейтинга</span>
        <span
            v-else
            :class="!item.ratingKinopoisk ? 'text-slate-300' : item.ratingKinopoisk > 8 ? 'text-yellow-500' : item.ratingKinopoisk > 7 ? 'text-green-500' : item.ratingKinopoisk > 5 ? 'text-slate-600' : 'text-red-400'"
            class="text-5xl font-bold">
           {{ item.ratingKinopoisk }}</span>
        <div class="text-slate-800 text-sm text-center mb-2">
          Оценок: {{ item.ratingKinopoiskVoteCount }}
        </div>
        <a :href="item.webUrl" class="mb-2 rounded-full bg-orange-600 px-12 py-4 text-center font-bold">Оценить</a>
      </div>
    </div>
  </section>
  <div class="h-20 bg-white"></div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {useRoute} from "vue-router";
import Loading from "@/components/Loading.vue";
import BackLink from "@/components/BackLink.vue";

const isLoading = ref(true)
const route = useRoute()
const id = route.params.id
const item = ref({
  nameRu: '',
  nameOriginal: '',
  year: '',
  filmLength: '',
  countries: [],
  genres: [],
  ratingKinopoisk: '',
  ratingVoteCount: '',
  posterUrl: '',
  posterUrlPreview: '',
  description: '',
  shortDescription: '',
  webUrl: '',
  ratingKinopoiskVoteCount: '',
})
/*const videos = ref([])
const teaser = ref('')*/

const getItem = async (id) => {
  isLoading.value = true
  const {data} = await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`, {
    headers: {
      "X-API-KEY": "9e52d931-b757-457b-a1ea-0d872ae51d51",
      "Content-Type": "application/json",
    },
  })
  /*  const {data: videosData} = await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/videos`, {
      headers: {
        "X-API-KEY": "9e52d931-b757-457b-a1ea-0d872ae51d51",
        "Content-Type": "application/json",
      },
    })*/
  item.value = data
  console.log(item.value)
  /*  videos.value = videosData.items*/
  /*  getTeaser()*/
  isLoading.value = false
}

/*const getTeaser = () => {
  teaser.value = videos.value.filter((item) => item.name === 'DVD-трейлер')[0].url
  console.log(teaser.value)
}*/

onMounted(() => {
  getItem(id)
})
</script>

<style lang="scss" scoped>

</style>