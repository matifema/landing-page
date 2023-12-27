<script>
import { RouterLink } from 'vue-router'

export default {
  name: 'NavBar',
  // any other component options...
};
</script>


<template>
  <div class="greetings">
      <h1>
        <RouterLink class="accent" to="/">MaTiFeMa</RouterLink>
      </h1>
      <h3>
          Marco Tiberio Ferri Marini
      </h3>
  </div>
  
  <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/projects">Projects</RouterLink>
      <RouterLink to="/about">About</RouterLink>
  </nav>
</template>

<style scoped>
nav {
  width: fit-content;
  margin: auto;
}
nav a:first-of-type {
  border: 0;
}
nav a.router-link-exact-active {
  color: var(--color-text);
}
nav a.router-link-exact-active:hover {
  background-color: transparent;
}
nav a {
  display: inline-block;
  color: var(--accent);
  justify-items: center;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

.greetings h1 {
  font-weight: 500;
  font-size: 2.6rem;
  text-align: center;
}
.greetings h3 {
  font-size: 1.2rem;
  text-align: center;
}
@media (min-width: 800px) {
  nav a {
    font-size: 20px;
  }
}
</style>