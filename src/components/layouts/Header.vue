<template>
  <header
      class="fixed bottom-0 z-50 mx-auto flex py-1 justify-center items-center gap-4 p-2 h-14 w-full bg-gray-900 bg-opacity-70">
    <nav class="flex gap-16 justify-center container">
      <RouterLink class="text-black" to="/">
        <img alt="home" class="w-6 " src='/home.svg'>
      </RouterLink>
      <RouterLink class="text-black" to="/search">
        <img alt="home" class="w-6 " src='/search.svg'>
      </RouterLink>
    </nav>
  </header>
</template>