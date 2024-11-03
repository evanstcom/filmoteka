<template>
  <div>

  </div>
  <div>
    {{ item.nameRu ? item.nameRu : item.nameOriginal }}
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {useRoute} from "vue-router";
const route = useRoute()
const id = route.params.id
const item = ref({
  nameRu: '',
  nameOriginal: '',
})
const getItem = async (id) => {
  const {data} = await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`, {
    headers: {
      "X-API-KEY": "9e52d931-b757-457b-a1ea-0d872ae51d51",
      "Content-Type": "application/json",
    },
  })
  item.value = data
  console.log(item.value)
}
onMounted(() => {
  getItem(id)
  console.log(id)
})
</script>

<style lang="scss" scoped>

</style>