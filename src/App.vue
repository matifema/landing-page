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
.error {
  display: flex;
  flex-direction: column;
  align-content: center;
}
.page-container {
  margin-top: 60%;
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
