<template>
  <section class="container mx-auto px-1 ">
    <Title title="Профиль"/>
    <div class="sm:px-0">
      <h3 class="text-base/7 font-semibold">Информация о пользователе</h3>
      <p class="mt-1 max-w-2xl text-sm/6 text-gray-400">Пользователь PWA приложения</p>
    </div>
    <div class="mt-2">
      <dl>
        <div class=" py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 relative">
          <dt class="text-sm/6 font-medium">Имя</dt>
          <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">{{ authStore.userInfo.name }}</dd>
          <div
              class="absolute right-1 top-1/2 -translate-y-1/2  bg-opacity-50 bg-transparent p-4 rounded-full"
              @click="handlePopupEdit">
            <PencilSquareIcon class="size-6 text-blue-500" aria-hidden="true"/>
            <PopupEdit :handleClick="handlePopupEdit" :openPopup="openPopupEdit"/>
          </div>
        </div>
        <div class=" py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 relative">
          <dt class="text-sm/6 font-medium">Уведомления</dt>
          <dd v-if="authStore.notificationToken"
              class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">Уведомления разрешены
          </dd>
          <dd v-else class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">Уведомления не разрешены</dd>
          <div
              class="absolute right-1 top-1/2 -translate-y-1/2  bg-opacity-50 bg-gray-900 p-4 rounded-full"
              @click="handleOpenPopupNotification">
            <BellIcon v-if="authStore.notificationToken" class="size-6 text-green-500" aria-hidden="true"/>
            <BellSlashIcon v-else class="size-6 text-red-500" aria-hidden="true"/>
            <PopupNotification :handleClick="handleOpenPopupNotification" :openPopup="openPopupNotification"/>
          </div>
        </div>
        <div class=" py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium">Email address</dt>
          <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">{{ authStore.userInfo.email }}</dd>
        </div>
      </dl>
    </div>
    <button @click="handlePopupLogout"
            class="container absolute bottom-24 left-1/2 w-11/12 -translate-x-1/2 text-md  bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-400 py-2 rounded-md">
      Выйти
    </button>
    <PopUpLogout :handle-click="handlePopupLogout" :open-popup="openPopupLogout"/>
  </section>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import Title from "@/components/Title.vue";
import PopUpLogout from "@/components/PopupLogout.vue";
import PopupNotification from "@/components/PopupNotification.vue";
import PopupEdit from "@/components/PopupEdit.vue";
import {BellSlashIcon, BellIcon, PencilSquareIcon} from "@heroicons/vue/24/outline/index.js";
import {useAuthStore} from "@/stores/auth.js";

const authStore = useAuthStore()

const openPopupNotification = ref(false)
const openPopupLogout = ref(false)
const openPopupEdit = ref(false)

const handleOpenPopupNotification = () => {
  openPopupNotification.value = !openPopupNotification.value
}
const handlePopupLogout = () => {
  openPopupLogout.value = !openPopupLogout.value
}
const handlePopupEdit = () => {
  openPopupEdit.value = !openPopupEdit.value
}

onMounted(() => {
  authStore.getTokenNotification()
})
</script>