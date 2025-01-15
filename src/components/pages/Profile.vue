<template>
  <section class="container px-1 flex flex-col gap-2 justify-between ">
    <Title title="Профиль"/>
    <h2 class="text-xl mb-2">Добро пожаловать в профиль </h2>
    <h2 class="text-xl mb-2">{{ authStore.userInfo.name }} </h2>
  </section>
  <button @click="handleOpenPopup"
          class="container absolute bottom-24 left-1/2 w-11/12 -translate-x-1/2 text-md bg-orange-600 py-2 rounded-md">
    Выйти
  </button>
  <PopUpLogout :handle-click="handleOpenPopup" :open-popup="openPopup"/>
</template>

<script setup>
import {ref} from 'vue'
import Title from "@/components/Title.vue";
import PopUpLogout from "@/components/PopupLogout.vue";
import {useAuthStore} from "@/stores/auth.js";

const authStore = useAuthStore()
const openPopup = ref(false)
const handleOpenPopup = () => {
  openPopup.value = !openPopup.value
}

</script>