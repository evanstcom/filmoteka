<template>
  <header id="menu"
          class="fixed bottom-0 z-50 mx-auto flex items-start justify-center w-full bg-gray-600 bg-opacity-50 backdrop-blur-sm ">
    <nav
        class="flex justify-between items-center container px-4 pb-6 pt-2 w-full gap-4">
      <RouterLink to="/" class="flex flex-col items-center gap-1">
        <HomeIcon class="w-6 text-gray-50" alt="home"/>
        <span class="text-xs text-white">Главное</span>
      </RouterLink>
      <RouterLink to="/favorites" class="flex flex-col items-center gap-1">
        <BookmarkIcon class="w-6 text-gray-50" alt="favorites"/>
        <span class="text-xs text-white">Мое</span>
      </RouterLink>
      <RouterLink to="/search" class="flex flex-col items-center gap-1"
                  @click="searchStore.memory=''; searchStore.memoryFilms=[]">
        <MagnifyingGlassIcon class="w-6 text-gray-50" alt="search"/>
        <span class="text-xs text-white">Поиск</span>
      </RouterLink>
      <RouterLink to="/profile" class="flex flex-col items-center gap-1">
        <UserIcon class="w-6 text-gray-50" alt="profile"/>
        <span class="text-xs text-white">Профиль</span>
      </RouterLink>
    </nav>
  </header>
</template>

<script setup>
import {HomeIcon, UserIcon, MagnifyingGlassIcon, BookmarkIcon} from "@heroicons/vue/24/outline";
import {useSearchStore} from "@/stores/search.js";

const searchStore = useSearchStore();
</script>
