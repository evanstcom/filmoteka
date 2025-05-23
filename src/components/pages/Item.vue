<!--suppress JSValidateTypes -->
<template>
  <metainfo>
    <template v-slot:title>{{ item.nameRu }}</template>
    <template v-slot:meta>{{
        item.shortDescription ? item.shortDescription : item.description
      }}
    </template>
  </metainfo>
  <Loading v-if="isLoading" :full-screen="true"/>
  <main v-else class="bg-white">
    <div class="flex justify-center items-center w-full fixed -z-10 -mt-96 pt-12">
      <img class="w-1/2" :src="item.posterUrl" :alt="item.nameRu ? item.nameRu : item.nameOriginal">
    </div>
    <section class="container mt-96 mx-auto pb-4 relative">
      <div
          class="absolute -top-20 bg-gradient-to-t from-white to-transparent w-full h-20  z-30">
      </div>
      <div class="fixed z-50 top-4 left-4">
        <BackLink/>
      </div>
      <div class="flex flex-col gap-2 w-full justify-between">
        <h1 class="text-xl text-center">{{ item.nameRu ? item.nameRu : item.nameOriginal }}</h1>
        <div class="self-center">
          <div class="flex justify-center items-start gap-2 mb-1 px-1">
            <div
                :class="!item.ratingKinopoisk ? 'text-gray-400' : item.ratingKinopoisk > 8 ? 'text-yellow-500' : item.ratingKinopoisk > 7 ? 'text-green-600' : item.ratingKinopoisk > 5 ? 'text-gray-400' : 'text-red-600'"
                class="text-sm font-semibold text-center min-w-10 rounded-sm">
              {{ item.ratingKinopoisk ? item.ratingKinopoisk : 'нет рейтинга' }}
            </div>
          </div>
          <p class="text-slate-400 text-sm text-center">
            {{ item.genres.reduce((acc, genre) => genre.genre + ', ' + acc, '') }}
            {{ item.countries[0] ? item.countries[0].country : item.countries.country }}</p>
        </div>
        <div
            class="flex gap-4 justify-center items-center">
          <div v-if="item.startYear" class="text-sm text-center">{{ item.startYear }}-{{
              item.endYear ? item.endYear : "н.в."
            }}
          </div>
          <div v-else class="text-sm">{{ item.year }}</div>
          <div v-if="item.filmLength" class="text-gray-500 text-sm">{{
              item.filmLength
            }} мин.
          </div>
          <div v-if="item.ratingAgeLimits"
               class=" text-black text-xs font-semibold w-8 border border-black rounded-md box-border h-5 flex justify-center items-center">
            {{
              item.ratingAgeLimits.split('age')[1]
            }}+
          </div>
        </div>
      </div>
      <div
          class="flex items-center justify-around bg-gradient-to-r from-gray-600 via-orange-600 to-fray-600 bg-opacity-10 mt-3 rounded-sm">
        <div
            class="p-2 flex flex-col items-center justify-center"
            @click="item. isFavorite ? favoritesStore.removeFromFavorites(item, id) : favoritesStore.
              addToFavorites(item, id)"
        >
          <BookmarkIcon class="w-6" alt="home"
                        :class="item.isFavorite ? 'text-orange-600 fill-orange-600' : 'text-white'"/>
          <span class="text-xs text-center text-white">Буду <br>смотреть</span>
        </div>
        <a :href="item.webUrl"
           class="my-2 text-sm rounded-full text-white bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-400 px-4 py-2 text-center">Смотреть
          на
          Кинопоиске</a>

      </div>
    </section>
    <section class="container p-2">
      <Title title="Актеры и съемочная группа"/>
      <StaffList :staff-list="staff || []"/>
    </section>
    <section>
      <div class="container mx-auto flex flex-col gap-2 w-full px-2 pt-2 pb-8">
        <div class="py-4">
          <p class="text-sm font-bold mb-2">{{ item.shortDescription ? item.shortDescription : item.description }}</p>
          <Swiper v-if="item.shortDescription && item.description" open-text="Подробнее"
                  :description="item.description"/>
        </div>
        <h2 class="text-xl bold">Рейтинг Кинопоиска</h2>
        <div
            class="flex flex-col items-center justify-center bg-gray-300 bg-opacity-50 py-4 rounded-md w-full self-center gap-2">
        <span
            v-if="!item.ratingKinopoisk"
            class="text-md text-gray-600 font-bold">нет рейтинга</span>
          <span
              v-else
              :class="!item.ratingKinopoisk ? 'text-slate-300' : item.ratingKinopoisk > 8 ? 'text-yellow-500' : item.ratingKinopoisk > 7 ? 'text-green-500' : item.ratingKinopoisk > 5 ? 'text-slate-600' : 'text-red-400'"
              class="text-5xl font-bold">
           {{ item.ratingKinopoisk }}</span>
          <div class=" text-sm text-center mb-2">
            Оценок: {{ item.ratingKinopoiskVoteCount }}
          </div>
          <a :href="item.webUrl"
             class="mb-2 rounded-full px-10 py-3 text-center bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-400 text-white">Оценить</a>
        </div>
      </div>
    </section>
    <section class="container p-2" v-if="true"> <!--//comments-->
      <Title title="Отзывы"/>
      <div v-if="comments.length === 0"
           class="bg-gray-100 bg-opacity-50 flex items-center justify-center py-4 rounded-md text-xs text-gray-500">Нет
        отзывов
      </div>
      <CommentsList v-else :comments="comments" :film-id="item.kinopoiskId ? item.kinopoiskId : item.filmId"/>
      <div class="mt-2">
        <div
            v-if="!isEdit"
            class="flex items-center justify-center gap-2 cursor-pointer"
            @click="handlePopupComment">
          <div class="bg-gray-100 bg-opacity-50 py-2 px-4 rounded-full flex items-center gap-2 ">
            <span class="text-xs text-gray-500">Добавить отзыв</span>
            <PencilSquareIcon class="size-4 text-blue-400" aria-hidden="true"/>
            <PopupComment :handleClick="handlePopupComment" :openPopup="openPopupComment"
                          :film-id="item.kinopoiskId ? item.kinopoiskId : item.filmId"/>
          </div>
        </div>
      </div>

    </section>
    <section v-show="similarFilms" class="container p-2">
      <Title title="Похожие"/>
      <SliderList :films="similarFilms ? similarFilms : []"/>
    </section>
    <ScrollToTop/>
    <div class="h-28 bg-white"></div>
  </main>
</template>

<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import Loading from "@/components/ui/Loading.vue";
import BackLink from "@/components/ui/BackLink.vue";
import SliderList from "@/components/SliderList.vue";
import ScrollToTop from "@/components/ui/ScrollToTop.vue";
import Title from "@/components/ui/Title.vue";
import StaffList from "@/components/StaffList.vue";
import {useMeta} from "vue-meta";
import {BookmarkIcon, PencilSquareIcon} from "@heroicons/vue/24/outline/index.js";
import {useFavoritesStore} from "@/stores/favorites.js";
import Swiper from "@/components/ui/Swiper.vue";
import PopupComment from "@/components/popups/PopupComment.vue";
import {getDatabase, onValue, ref as dbRef, set, update} from "firebase/database";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import CommentsList from "@/components/CommentsList.vue";

const favoritesStore = useFavoritesStore()
const isLoading = ref(true)
const openPopupComment = ref(false)
const route = useRoute()
const id = route.params.id
const item = ref({
  nameRu: '',
  kinopoiskId: Number,
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
  isFavorite: false,
})
const similarFilms = ref([])
const staff = ref([])
const comments = ref([])
const showDescription = ref(false)
const isEdit = ref(false)

const apiKey = import.meta.env.VITE_API_KEY_FILMS

const auth = getAuth();
const db = getDatabase();

const handlePopupComment = () => {
  openPopupComment.value = !openPopupComment.value
}
const getItem = async (id) => {
  onAuthStateChanged(auth, (user) => {
    isLoading.value = true
    if (user) {
      const starCountRef = dbRef(db, `items/${id}`);
      onValue(starCountRef, (snapshot) => {
        if (snapshot.val()) {
          const favorite = favoritesStore.favorites.find(favItem => favItem.id === +id)
          if (favorite) {
            item.value = {
              ...snapshot.val().data,
              isFavorite: true
            }
          } else {
            item.value = {
              ...snapshot.val().data,
              isFavorite: false
            }
          }
          similarFilms.value = snapshot.val().similar
          staff.value = snapshot.val().staff
          comments.value = snapshot.val().comments || []
          console.log(comments.hasOwnProperty(`${auth.currentUser.uid}`))
          console.log(auth.currentUser.uid)
          console.log(comments.value)
          comments.value.hasOwnProperty(auth.currentUser.uid) ? isEdit.value = true : isEdit.value = false
        } else {
          getDataItem(id)
        }
        isLoading.value = false
      }, (error) => {
        console.log(error);
      });
    } else {
      console.log("User logged out")
    }
  })
}

const getDataItem = async (id) => {
  const {data} = await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`, {
    headers: {
      "X-API-KEY": `${apiKey}`,
      "Content-Type": "application/json",
    },
  })
  set(dbRef(db, `items/${id}`), {
    data
  }).then(() => console.log('Добавлено')).catch((error) => console.log(error))
  const favorite = favoritesStore.favorites.find(favItem => favItem.id === +id)
  if (favorite) {
    item.value = {
      ...data,
      isFavorite: true
    }
  } else {
    item.value = {
      ...data,
      isFavorite: false
    }
  }
  await getSimilar(id)
  await getStaff(id)
}

const getSimilar = async (id) => {
  const {data} = await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/similars`, {
    headers: {
      "X-API-KEY": `${apiKey}`,
      "Content-Type": "application/json",
    },
  })
  update(dbRef(db, `items/${id}`), {
    similar: data.items
  }).then(() => console.log('Добавлено')).catch((error) => console.log(error))
  similarFilms.value = data.items
}
const getStaff = async (id) => {
  const {data} = await axios.get(`https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${id}`, {
    headers: {
      "X-API-KEY": `${apiKey}`,
      "Content-Type": "application/json",
    },
  })
  update(dbRef(db, `items/${id}`), {
    staff: data
  }).then(() => console.log('Добавлено')).catch((error) => console.log(error))
  staff.value = data
}

const onLoad = (id) => {
  item.value = {
    nameRu: '',
    kinopoiskId: Number,
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
    isFavorite: false,
  }
  similarFilms.value = []
  staff.value = []
  getItem(id)
  console.log(id)
}

onMounted(() => {
  favoritesStore.getFavorites()
  onLoad(id)
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})

onBeforeRouteUpdate((to, from) => {
  if (to.params.id !== from.params.id) {
    onLoad(to.params.id)
    showDescription.value = false
  }
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
});

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

<style lang="scss" scoped>
:deep(.modal-style) {
  box-sizing: border-box;
  width: 100%;
  color: white;
  border-radius: 1rem 1rem 0 0;
}

:deep(.swipe-modal-drag-handle) {
  background-color: #ea580c !important;
  width: 48px !important;
}

:deep(.swipe-modal-content) {
  background-color: rgba(157, 157, 157, 0.96) !important;
}
</style>