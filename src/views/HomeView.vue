<template>
  <main>
    <img class="image" src="https://media.tenor.com/gab1CDkE83kAAAAi/pusheen-lunch.gif" alt="sup">
    built with vue3
  </main>
</template>

<style scoped>
.image{
  margin: 10px auto 20px;
  display: block;
}
.homepage {
  display: none;
}
@media(min-width: 800px) {
  .homepage {
    display: flex;
    width: 100%;
    height: 100%;
  }
}
</style>