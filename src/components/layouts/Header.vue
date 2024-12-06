<template>
  <header
      class="fixed bottom-0 z-50 mx-auto flex justify-center items-center py-8 h-14 w-full ">
    <nav class="flex justify-around items-center container bg-gray-900 p-4 w-1/3 gap-4 mb-8 rounded-2xl relative">
      <RouterLink to="/">
        <img alt="home" class="w-6 " src='/home.svg'>
      </RouterLink>
      <RouterLink to="/search">
        <img alt="home" class="w-6 " src='/search.svg'>
      </RouterLink>
      <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-7 bg-orange-600 "></div>
    </nav>
  </header>
</template>