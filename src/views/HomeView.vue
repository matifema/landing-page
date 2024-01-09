<script setup>
import NavigateComponent from '@/components/NavigateComponent.vue';
</script>

<template>
  <main>
    <div class="homepage">
      <NavigateComponent/>
    </div>
    <img class="image" src="https://media.tenor.com/gab1CDkE83kAAAAi/pusheen-lunch.gif" alt="sup">
    <br>
    <div class="info">
      <br>
      type 'help' or 'h' for commands <br>
      <span>ctrl</span> + <span>s</span> to focus on search <br>
      <span>esc</span> to go back to home
    </div>
  </main>
</template>

<style scoped>
.image{
  margin: 10px auto 20px;
  display: block;
}
.info {
  display: none;
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
  .info {
    display: inline;
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
}
</style>