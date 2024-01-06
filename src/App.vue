<script setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router'
import NavBar from '../src/components/NavBar.vue'

document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    showing.value = false;
  }
});
const showing = ref(true)
</script>

<template>
  <div v-show="showing" class="error">
    <a class="teapot" href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418">Error 418 🫖</a>
    <br>
    <a style="cursor: pointer;" @click = "showing = !showing">I'm not a teapot</a>
  </div>
  
  <transition mode="out-in">
    <header v-show="!showing">
      <NavBar/>
    </header>
  </transition>

  <main v-show="!showing" class="page-container">
    <router-view v-slot="{ Component }">
      <transition mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<style scoped>
.error {
  display: flex;
  flex-direction: column;
  align-content: center;
}
.page-container {
  margin-top: 40%;
  max-width: 80%;
}
.teapot {
  font-family: monospace;
  font-size: 6vh;
}
.teapot:hover {
  background-color: rgba(210, 105, 30, 0.263);
  border-radius: 20px;
}

header {
  justify-self: center;
  position: absolute;
  transform: translateY(10px);
  padding: 10px;
}

@media (min-width: 800px) {
  header {
    background-color: var(--color-background);
    border-radius: 20px;
  }
  .teapot {
    font-size: 500%;
  }
  .page-container {
    margin-top: auto;
    max-width: 60%;
    justify-content: center;
    padding: 0;
  }

}
</style>
