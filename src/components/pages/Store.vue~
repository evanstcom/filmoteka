<template>
  <nav class="flex justify-around items-center container mx-auto bg-gray-900 p-4 w-2/3 gap-4 mb-1 rounded-2xl">
    <RouterLink :class="path === '/pinia' ? 'text-orange-600' : null " to="/pinia">Pinia</RouterLink>
    <RouterLink :class="path === '/store' ? 'text-orange-600' : null " to="/store">Store</RouterLink>
  </nav>
  <div>
    <h1 class="text-2xl mb-10 text-center">Store</h1>
    <div class="flex justify-center items-center gap-8">
      <button :disabled="counter.count === 0"
              class="bg-orange-600 w-10 h-10 flex items-center justify-center rounded-2xl disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
              @click="counter.decrement">-
      </button>
      <div class="w-24 text-center">Count: {{ counter.count }}</div>
      <button class="bg-orange-600 w-10 h-10 flex items-center justify-center rounded-2xl"
              @click="counter.increment">+
      </button>
    </div>
    <div class="text-center ">
      <button class=" underline" @click="counter.reset">Reset</button>
    </div>
  </div>
</template>

<script setup>
import {useCounterStore} from '@/stores/counter'
import {useRoute} from "vue-router";

const path = useRoute().path
const counter = useCounterStore()


</script>