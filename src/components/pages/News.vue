<template>
  <Loading v-if="isLoading"/>
  <section v-else class="relative container mx-auto p-1">
    <div class="flex gap-2 mb-4">
      <BackLink/>
      <Title title="Новости"/>
    </div>
    <div class="grid-cols-1 grid gap-1">
      <div v-for="item in newsData" :key="item.kinopoiskId">
        <div class="relative rounded-md overflow-hidden bg-cover h-48 w-full"
             :style="`background-image: url(${item.imageUrl})`">
          <div class="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
          <h2 class="absolute bottom-4 left-4 text-xs w-1/2">{{ item.title }}</h2>
          <a :href="item.url"
             class="absolute bottom-4 right-4 text-xs bg-orange-600 px-4 py-2 rounded-md">Подробнее</a>
        </div>
      </div>
    </div>
    <ScrollToTop/>
    <div class="h-32"></div>
  </section>
  <div class="fixed bottom-20 right-1/2 translate-x-1/2 inline-block bg-gray-900 bg-opacity-50 p-2 rounded-md z-50">
    <vue-awesome-paginate
        :total-items="total"
        :items-per-page="20"
        :max-pages-shown="3"
        v-model="currentPage"
        @click="onClickHandler"
    />
  </div>
</template>

<script setup>
import BackLink from "@/components/BackLink.vue";
import Title from "@/components/Title.vue";
import ScrollToTop from "@/components/pages/ScrollToTop.vue";

import {onMounted, ref} from "vue";
import {VueAwesomePaginate} from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
import Loading from "@/components/Loading.vue";
import axios from "axios";

const onClickHandler = async (page) => {
  await getNews(page);
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
};

const currentPage = ref(1);

const newsData = ref([])

const isLoading = ref(true)

const total = ref(0)

const getNews = async (page) => {
  isLoading.value = true
  const {data} = await axios.get(`https://kinopoiskapiunofficial.tech/api/v1/media_posts?page=${page}`, {
    headers: {
      "X-API-KEY": "9e52d931-b757-457b-a1ea-0d872ae51d51",
      "Content-Type": "application/json",
    },
  })
  newsData.value = data.items
  isLoading.value = false
  total.value = data.total
  console.log(data)
}

onMounted(async () => {
  await getNews(currentPage.value)
})
</script>

<style>
.pagination-container {
  display: flex;
  column-gap: 4px;
}

.paginate-buttons {
  height: 24px;
  font-size: 12px;
  width: 24px;
  transition: all 0.2s ease-in-out;
  border-radius: 6px;

  cursor: pointer;

  background-color: rgba(47, 47, 47, 0.5);

  color: white;
}

.paginate-buttons:hover {
  color: orangered;
}

.active-page {
  background-color: orangered;
  border: 1px solid transparent;
  color: white;
}

.active-page:hover {
  background-color: transparent;

  color: orangered;

  border: 1px solid orangered;
}
</style>