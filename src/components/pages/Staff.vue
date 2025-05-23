<template>
  <metainfo>
    <template v-slot:title>{{ item.nameRu }}</template>
    <template v-slot:meta>{{
        item.shortDescription ? item.shortDescription : item.description
      }}
    </template>
  </metainfo>
  <Loading v-if="isLoading" :full-screen="true"/>
  <div v-else>
    <section class="bg-white">
      <div class="flex w-full mt-14 gap-2 container px-2">
        <img class="w-28 rounded-sm" :src="item.posterUrl" :alt="item.nameRu ? item.nameRu : item.nameEn">
        <div class="flex flex-col gap-1">
          <div>{{ item.nameRu ? item.nameRu : item.nameEn }}</div>
          <div v-show="item.nameRu" class="text-gray-500 text-sm">{{ item.nameEn }}</div>
          <p v-show="item.age" class="text-gray-500 text-xs">{{ item.age }} {{ declOfNum(item.age) }} </p>
          <p class="text-gray-500 text-xs">{{ item.profession }}</p>
        </div>
      </div>
      <div class="fixed z-50 top-4 left-4">
        <BackLink/>
      </div>
    </section>
    <section>
      <div class="container mx-auto flex flex-col gap-2 w-full px-2 pt-2 pb-8">
        <h2 class="text-xl bold">Фильмы</h2>
        <div class="columns-2 gap-2 space-y-2">
          <RouterLink :to="{ name: 'item', params: {id: film.filmId}}"
                      v-for="film in item.films"
                      :key="film.rating"

                      class="flex items-center gap-2 bg-gray-500 bg-opacity-10 p-2 rounded-md justify-between  break-inside-avoid-column">
            <div class="flex flex-col">
              <h3 class="text-xs">
                {{ film.nameRu ? film.nameRu : film.nameEn }}
              </h3>
              <!--            <h4 class="text-gray-500 text-xs">
                            {{ film.description }}
                          </h4>-->
            </div>
            <div class="w-4 flex items-center justify-center">
                          <span
                              v-if="!film.rating"
                              class="text-sm text-gray-600">-</span>
              <span
                  v-else
                  :class="!film.rating ? 'text-slate-300' : film.rating > 8 ? 'text-yellow-500' : film.rating > 7 ? 'text-green-500' : film.rating > 5 ? 'text-slate-600' : 'text-red-400'"
                  class="text-xs">
               {{ film.rating }}</span>
            </div>
          </RouterLink>
        </div>
      </div>
      <ScrollToTop/>
      <div class="h-28 bg-white"></div>
    </section>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {useRoute} from "vue-router";
import Loading from "@/components/ui/Loading.vue";
import BackLink from "@/components/ui/BackLink.vue";
import ScrollToTop from "@/components/ui/ScrollToTop.vue";
import {useMeta} from "vue-meta";
import {useFavoritesStore} from "@/stores/favorites.js";
import {getDatabase, onValue, ref as dbRef, set} from "firebase/database";
import {getAuth, onAuthStateChanged} from "firebase/auth";

const auth = getAuth();
const db = getDatabase();


const favoritesStore = useFavoritesStore()
const isLoading = ref(true)
const route = useRoute()
const id = route.params.id
const item = ref({})

const apiKey = import.meta.env.VITE_API_KEY_FILMS

const getItem = async (id) => {
  onAuthStateChanged(auth, (user) => {
    isLoading.value = true
    if (user) {
      const starCountRef = dbRef(db, `staff/${id}`);
      onValue(starCountRef, (snapshot) => {
        if (!snapshot.val()) {
          getDataItem(id)
        } else {
          item.value = snapshot.val().data
        }
        isLoading.value = false
      }, (error) => {
        console.log(error);
        isLoading.value = false
      });
    } else {
      console.log("User logged out")
    }
  })
}

const getDataItem = async (id) => {
  const {data} = await axios.get(`https://kinopoiskapiunofficial.tech/api/v1/staff/${id}`, {
    headers: {
      "X-API-KEY": `${apiKey}`,
      "Content-Type": "application/json",
    },
  })
  data.films = data.films.filter((value, index, self) =>
          index === self.findIndex((t) => (
              t.nameRu === value.nameRu && t.nameRu === value.nameRu
          ))
  ).sort((a, b) => b.rating - a.rating)
  set(dbRef(db, `staff/${id}`), {
    data
  }).then(() => console.log('Добавлено')).catch((error) => console.log(error))
  item.value = data
}

const declOfNum = (age) => {
  let text = ''
  let count = age % 100;
  if (count >= 5 && count <= 20) {
    text = 'лет';
  } else {
    count = age % 10;
    if (count === 1) {
      text = 'год';
    } else if (count >= 2 && count <= 4) {
      text = 'года';
    } else {
      text = 'лет';
    }
  }
  return text;
}


const onLoad = (id) => {
  getItem(id)
}

onMounted(() => {
  onLoad(id)
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})

useMeta({
  title: 'Filmoteka by EVANS',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Фильмы и сериалы на любой вкус'
    }
  ]
})
</script>