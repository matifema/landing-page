<script setup>
import { RouterView } from "vue-router";
import NavBar from "../src/components/NavBar.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <Header></Header>
  <main class="page-container">
    
    <NavBar></NavBar>
    <router-view v-slot="{ Component }">
      <transition mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

  </main>
  <Footer></Footer>
</template>

<style scoped>
.page-container {
  padding-left: 100px;
  padding-top: 15%;
  padding-bottom: 15%;
}
</style>
