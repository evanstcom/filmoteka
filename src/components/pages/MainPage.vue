<template>
  <metainfo>
    <template v-slot:title></template>
  </metainfo>
  <Loading v-if="premiersStore.loader" :full-screen="true"/>
  <section v-else class="container mx-auto px-1">
    <Title title="Последние новости" :show-all="true" link="news"/>
    <NewsItem/>
    <Title title="Премьеры этого месяца" :show-all="true" link="premier"/>
    <SliderList :films="premiersStore.premiers.slice(0, 20)" class="mb-2"/>
    <Title title="Топ 250" :show-all="true" link="top"/>
    <SliderList :films="premiersStore.topOnMain"/>
    <div class="h-20 flex justify-end items-end">
    </div>
  </section>
</template>

<script setup>
import {onMounted} from "vue";
import SliderList from "../SliderList.vue";
import Loading from "../ui/Loading.vue";
import NewsItem from "../NewsItem.vue";
import Title from "@/components/ui/Title.vue";
import {useAuthStore} from "@/stores/auth.js";
import {useMeta} from "vue-meta";
import {usePremiersStore} from "@/stores/premiers.js";

const authStore = useAuthStore()
const premiersStore = usePremiersStore()

const notificationPermission = () => {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Разрешение на уведомления получено!');
    } else {
      console.log('Разрешение на уведомления отклонено.');
      localStorage.removeItem('notificationToken')
      useAuthStore().notificationToken = ''
    }
  });
}

onMounted(() => {
  if (!premiersStore.premiers.length || !premiersStore.topOnMain.length) {
    premiersStore.getPremiers()
    premiersStore.getTopOnMain()
  }
  authStore.getTokenNotification()
  notificationPermission()
})

useMeta({
  title: 'Главная - Filmoteka by EVANS',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Фильмы и сериалы на любой вкус'
    }
  ]
})
</script>

