<script>
import { RouterLink } from 'vue-router'

export default {
  name: 'NavBar'
};
</script>

<template>
  <main>
    <h1>
      <RouterLink class="title" to="/">MaTiFeMa</RouterLink>
    </h1>

    <nav>
      <RouterLink to="/links">Links</RouterLink>
      <RouterLink to="/projects">Projects</RouterLink>
      <RouterLink to="/guestbook">Guestbook</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
    <hr>
  </main>
</template>

<style scoped>
.title {
  color: var(--accent);
  font-weight: 800;
  font-size: 3rem;
}
nav {
  display: inline-block;
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
nav a{
  color: var(--accent);
  justify-items: center;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  font-size: 1.2rem;
}

@media (min-width: 800px) {
  hr{
    display: none;
  }
  .title {
    float: left;
  }
  nav {
    display: inline-block;
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
  nav a{
    color: var(--accent);
    justify-items: center;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
    font-size: 1.2rem;
  }
}
</style>