<script setup>
import Header from "@/components/layouts/Header.vue"
import {useAuthStore} from "@/stores/auth.js";
import {computed, onMounted} from "vue";

const authStore = useAuthStore()

const token = computed(() => authStore.accessToken)

const checkUser = () => {
  const accessToken = localStorage.getItem('accessToken')
  const refreshToken = localStorage.getItem('refreshToken')
  const user = localStorage.getItem('user')
  if (accessToken && refreshToken && user) {
    authStore.accessToken = accessToken
  }
  if (refreshToken) {
    authStore.refreshToken = refreshToken
  }
  if (user) {
    authStore.userInfo = JSON.parse(user)
  }
}
onMounted(() => checkUser())
</script>


<template>
  <Header v-if="token"/>
  <main class="mt-2">
    <RouterView/>
  </main>
</template>