<script setup>
import Header from "@/components/layouts/Header.vue"
import {useAuthStore} from "@/stores/auth.js";
import {computed} from "vue";
import {useRouter} from "vue-router";

const authStore = useAuthStore()

const token = computed(() => authStore.userInfo.token)

const router = useRouter()
const checkUser = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user) {
    authStore.userInfo.token = user.token
    authStore.userInfo.refreshToken = user.refreshToken
    authStore.userInfo.name = user.name
    authStore.userInfo.expiresIn = user.expiresIn
  }
}
checkUser()
</script>


<template>
  <Header v-if="token"/>
  <main class="mt-2">
    <RouterView/>
  </main>
</template>

<style scoped lang="sass">
</style>