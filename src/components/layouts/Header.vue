<template>
  <header
      class="fixed bottom-0 z-50 mx-auto flex items-center justify-center py-8 h-14 w-full mb-4">
    <RouterLink to="/notification" class="absolute left-4  bg-opacity-50 bg-gray-900 p-4 rounded-full">
      <img alt="notification" class="w-6 " src='/bell.svg'>
    </RouterLink>
    <nav
        class="flex justify-around items-center bg-opacity-50 container bg-gray-900 p-4 w-48 gap-4 rounded-2xl relative">
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