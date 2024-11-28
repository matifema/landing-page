<template>
  <Header></Header>
  
  <div class="cursor-tracker">
    <p>X: {{ position.x }}, Y: {{ position.y }}, %: {{ position.dist }}, T: {{ localTime }}</p>
  </div>

  <main class="page-container">
    <NavBar :percentage="position.dist"></NavBar>
    
    <router-view v-slot="{ Component }">
      <transition mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

  </main>
  <Footer></Footer>
</template>

<script setup>
import { RouterView } from "vue-router";
import NavBar from "../src/components/NavBar.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { ref, reactive, onMounted, onUnmounted } from 'vue';

const position = reactive({ x: 0, y: 0 , dist: 0});

const updatePosition = (event) => {
  position.x = event.clientX;
  position.y = event.clientY;
  position.dist = 100 - Math.floor((position.x / window.screen.width) * 100);
};

const localTime = ref('');

const updateClock = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  localTime.value = `${hours}:${minutes}:${seconds}`;
};

let intervalId;
onMounted(() => {
  updateClock();
  intervalId = setInterval(updateClock, 1000);
  window.addEventListener('mousemove', updatePosition);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', updatePosition);
  clearInterval(intervalId);
});
</script>

<style scoped>
.page-container {
  padding-top: 10%;
  padding-bottom: 15%;
}
.cursor-tracker {
  font-family: Arial, sans-serif;
  padding-top: 3%;
  float: left;
}
@media screen and (max-width: 800px) {
  .page-container {
    max-width: 90%;
  }
}
</style>