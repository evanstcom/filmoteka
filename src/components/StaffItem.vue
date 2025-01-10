<template>

  <div>
    <div class="w-20 h-20 rounded-full flex items-center overflow-hidden mb-1">
      <img class="w-full object-cover items-center" :src="staffItem.posterUrl" :alt="staffItem.nameRu">
    </div>
    <h3 class="text-xs mb-1">{{ staffItem.nameRu ? staffItem.nameRu : staffItem.nameEn }}</h3>
    <h3 v-if="staffItem.professionKey === 'DIRECTOR'" class="text-xs mb-1 text-gray-500">Режиссер</h3>
    <h3 v-if="staffItem.description" class="text-xs mb-1 text-gray-500">{{ staffItem.description }}</h3>
  </div>
</template>
<script setup>

defineProps({
      staffItem: Object
    }
)
</script>