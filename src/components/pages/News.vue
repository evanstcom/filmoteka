<template>
  <metainfo>
    <template v-slot:title/>
  </metainfo>
  <Loading v-if="newsStore.loader" :full-screen="true"/>
  <section v-else class="relative container mx-auto p-1">
    <div class="flex gap-2 mb-1">
      <BackLink/>
      <Title title="Новости"/>
    </div>
    <div class="grid-cols-1 grid gap-2">
      <div v-for="news in newsStore.newsData" :key="news.item.kinopoiskId">
        <div class="relative overflow-hidden bg-cover h-48 w-full"
             :style="`background-image: url(${news.item.imageUrl})`">
          <div class="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
          <h2 class="absolute bottom-4 left-4 text-xs w-1/2 text-white">{{ news.item.title }}</h2>
          <a :href="news.item.url"
             class="absolute bottom-4 right-4 text-xs bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-400 px-4 py-2 rounded-md text-white">Подробнее</a>
        </div>
      </div>
    </div>
    <ScrollToTop/>
    <div class="h-32"></div>
  </section>
  <div
      class="fixed bottom-20 right-1/2 translate-x-1/2 inline-block bg-gray-600 bg-opacity-50 backdrop-blur-sm p-2 rounded-md z-50">
    <vue-awesome-paginate
        :total-items="208"
        :items-per-page="20"
        :max-pages-shown="3"
        v-model="currentPage"
        @click="onClickHandler"
    />
  </div>
</template>

<script setup>
import BackLink from "@/components/ui/BackLink.vue";
import Title from "@/components/ui/Title.vue";
import ScrollToTop from "@/components/ui/ScrollToTop.vue";

import {onMounted, ref} from "vue";
import {VueAwesomePaginate} from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
import Loading from "@/components/ui/Loading.vue";

import {useNewsStore} from "@/stores/news.js";

const newsStore = useNewsStore()
const onClickHandler = async (page) => {
  await newsStore.getNews(page);
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
};

const currentPage = ref(1);

onMounted(() => {
  if (!newsStore.newsData.length) {
    newsStore.getNews(1)
  } else {
    currentPage.value = newsStore.currentPage
  }
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})

import {useMeta} from "vue-meta";


useMeta({
  title: 'Новости',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Поиск фильмов, сериалов...'
    }
  ]
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

.active-page {
  background-color: orangered;
  border: 1px solid transparent;
  color: white;
}
</style>