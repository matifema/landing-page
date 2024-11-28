<template>
  <nav class="side-nav" :style="{ fontSize: percentage + 'px' }">
    <button 
      @click="hideMenu"
      class="show-button"
    >
    MENU
    </button>
    
    <RouterLink @click="hideMenu" v-if="isOpen" to="/" class="nav-link">MATIFEMA</RouterLink>
    <RouterLink @click="hideMenu" v-if="isOpen" to="/links" class="nav-link">links</RouterLink>
    <RouterLink @click="hideMenu" v-if="isOpen" to="/projects" class="nav-link">projects</RouterLink>
    <RouterLink @click="hideMenu" v-if="isOpen" to="/about" class="nav-link">about</RouterLink>
  </nav>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  name: "SideNav",
  data() {
    return {
      isOpen: false, // Initial navigation bar state
    };
  },
  beforeMount() {
    if (window.screen.width > 800){
      this.isOpen = true
    }
  },
  methods: {
    hideMenu() {
      if (window.screen.width < 800){
        this.isOpen = !this.isOpen;
      }
    },
  },
  props: {
    percentage: {
      type: Number,
      required: false,
      default: 16,
    },
  },
};
</script>

<style scoped>
@font-face {
  src: url("src/assets/fonts/AudioNugget.ttf") format("truetype"),
    url("src/assets/fonts/audionugget.woff") format("woff"),
    url("src/assets/fonts/audionugget.woff2") format("woff2");

  font-family: "AudioNugget";
  font-weight: normal;
  font-style: normal;
}

.show-button {
  background-color: var(--accent);
  border-radius: 2px;
  display: none;
  border: none;
}
.side-nav {
  background-color: transparent;
  font-family: "AudioNugget";
  align-items: flex-start;
  flex-direction: column;
  padding: 0.5rem 0;
  position: fixed;
  display: flex;
  z-index: 1000;
  height: 25vh;
  top: 10%;
  left: 0;
}

.nav-link {
  color: var(--accent);
  text-align: left;
  width: 100%;
}

.nav-link.router-link-exact-active {
  color: var(--color-text, #ff0000);
}

.nav-link:hover {
  background-color: transparent;
  color: var(--hover-color, #fff);
}

@media screen and (max-width: 800px) {
  .side-nav {
    width: fit-content;
    border-radius: 30px;
  }

  .nav-link {
    font-size: 0.9rem;
    padding: 0.8rem;
  }
  .show-button {
    display: unset;
  }
}
</style>
