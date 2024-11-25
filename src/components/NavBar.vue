<template>
  <nav class="side-nav">
    <RouterLink to="/" class="nav-link">MATIFEMA</RouterLink>
    <RouterLink to="/links" class="nav-link">links</RouterLink>
    <RouterLink to="/projects" class="nav-link">projects</RouterLink>
    <!--<RouterLink to="/guestbook" class="nav-link">/guestbook</RouterLink>-->
    <RouterLink to="/about" class="nav-link">about</RouterLink>
  </nav>
</template>

<script>
import { RouterLink } from "vue-router";


export default {
  name: "SideNav",
};
</script>

<style scoped>
@font-face {
  font-family: "BubbleFont";
  src: url("src/assets/fonts/AudioNugget.ttf") format("truetype");
}
.side-nav {
  font-family: BubbleFont;
  position: fixed;
  top: 10%;
  left: 0;
  width: 200px;
  height: 25vh;
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
  z-index: 1000;
}

.nav-link {
  text-decoration: none;
  color: var(--accent, #ffffff); /* Replace with your CSS variable or fallback */
  padding: 0.5rem;
  font-size: 4rem;
}

.nav-link.router-link-exact-active {
  color: var(--color-text, #ff0000); /* Active text color */
}

.nav-link:hover {
  background-color: var(--hover-background, #5e000058); /* Hover effect */
  color: var(--hover-color, #fff); /* Hover text color */
}

@media (max-width: 768px) {
  .side-nav {
    width: fit-content;
  }

  .nav-link {
    font-size: 0.9rem;
    padding: 0.8rem;
  }
}
</style>
