<template>
  <div @click="backPage" class="cursor-pointer inline-block bg-gray-900 bg-opacity-50 p-2 rounded-md">
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