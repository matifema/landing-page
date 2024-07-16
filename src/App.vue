<script setup>
import { RouterView } from 'vue-router'
import NavBar from '../src/components/NavBar.vue'

</script>

<template>
  <header style="margin-top: 10px;">
    <NavBar/>
  </header>

  <main class="page-container">
    <router-view v-slot="{ Component }">
      <transition mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<style scoped>
.page-container {
  margin-top: 10%;
  max-width:  80%;
}
@media(min-width: 800px){
  .page-container {
    max-width: 80%;
  }
}
</style>
