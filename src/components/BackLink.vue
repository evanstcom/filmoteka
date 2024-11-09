<template>
  <div @click="backPage" class="inline-block bg-gray-900 opacity-80 p-2 rounded-md">
    <img src="/right_arrow.svg" alt="back" class="rotate-180 w-4">
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";

const router = useRouter()
const backPage = () => router.go(-1)
</script>

<style lang="scss" scoped>

</style>