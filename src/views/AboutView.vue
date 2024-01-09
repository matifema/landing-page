<script setup>
import Resume from '@/components/Resume.vue';
</script>

<template>
  <main>
    <img src="https://i.imgur.com/PE0KH2F.jpeg" width="300" alt="not really me">
    <h1 class="title accent">about me</h1>
    <p class="text">
      22 y/o developer who's interested in cybersec, computing and building cool things. <br>
      also passionate about physics, rock climbing and biomimetics.
    </p>
    <Resume/>
  </main>
</template>

<style scoped>
img{
  float: left;
  margin: 20px;
}
</style>