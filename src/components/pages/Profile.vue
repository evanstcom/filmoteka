<template>
  <section class="container px-1 flex flex-col gap-2 justify-between ">
    <Title title="Профиль"/>
    <h2 v-if="authStore.userInfo.name" class="text-xl mb-2">Добро пожаловать, <span class="text-orange-600">

      {{
        authStore.userInfo.name
      }}
    </span>
    </h2>
    <h2 v-else class="text-xl mb-2">Добро пожаловать в профиль </h2>
    <div class="flex flex-col gap-2">
      <div class="flex flex-col gap-2">
        <h2 class="text-md">Данные профиля</h2>
        <div class="flex justify-between">
          <div class="flex flex-col">
            <span class="text-slate-400 text-sm">Email:</span>
            <span class="text-slate-400 text-sm">Имя:</span>
          </div>
          <div class="flex flex-col">
            <span class="text-slate-400 text-sm">{{ authStore.userInfo.email }}</span>
            <span class="text-slate-400 text-sm">{{ authStore.userInfo.name }}</span>
          </div>
        </div>
      </div>
      <button @click="handleEditPopup"
              class="self-end text-md bg-gray-900 py-1 px-2 rounded-md">
        Изменить
      </button>
      <PopupEdit :handle-click="handleEditPopup" :open-popup="openEdit"/>
    </div>
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
import PopupEdit from "@/components/PopupEdit.vue";
import {useAuthStore} from "@/stores/auth.js";

const authStore = useAuthStore()
const openPopup = ref(false)
const openEdit = ref(false)
const handleOpenPopup = () => {
  openPopup.value = !openPopup.value
}
const handleEditPopup = () => {
  openEdit.value = !openEdit.value
}

</script>