<template>
  <header
      class="fixed bottom-0 z-50 mx-auto flex justify-center items-center gap-4 py-8 h-14 w-full bg-black bg-opacity-70">
    <nav class="flex justify-around container">
      <RouterLink to="/">
        <img alt="home" class="w-7 " src='/home.svg'>
      </RouterLink>
      <RouterLink to="/search">
        <img alt="home" class="w-7 " src='/search.svg'>
      </RouterLink>
    </nav>
  </header>
</template>