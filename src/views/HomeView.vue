<script setup>
import NavigateComponent from '@/components/NavigateComponent.vue';
</script>

<template>
  <main>
    <div class="homepage">
      <NavigateComponent />
    </div>
    <div class="keyboard">
      <span>ctrl</span> + <span>s</span> to focus on search <br>
      <span>esc</span> to go back to home
    </div>
  </main>
</template>

<style scoped>
.keyboard {
  transform: translateX(5vw);
  position: fixed;
  bottom: 5%;
  font-size: 1.2rem;
  line-height: 3vh;
}
span {
  background-color: var(--vt-c-divider-dark-1);
  border-radius: 15%;
  padding: 1px;
}
.homepage {
  margin-top: 40%;
}
@media(min-width: 800px) {
  .homepage {
    margin-top: auto;
  }
}
</style>