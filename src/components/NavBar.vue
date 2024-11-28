<template>
  <nav class="side-nav">
    <button 
      @click="hideMenu"
      class="show-button"
    >
    /menu
    </button>
    
    <RouterLink @click="hideMenu" v-if="isOpen" to="/" class="nav-link">MATIFEMA</RouterLink>
    <RouterLink @click="hideMenu" v-if="isOpen" to="/links" class="nav-link">links</RouterLink>
    <RouterLink @click="hideMenu" v-if="isOpen" to="/projects" class="nav-link">projects</RouterLink>
    <RouterLink @click="hideMenu" v-if="isOpen" to="/about" class="nav-link">about</RouterLink>
    <!--<RouterLink to="/guestbook" class="nav-link">/guestbook</RouterLink>-->
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
  methods: {
    hideMenu() {
      if (window.screen.width < 800){
        this.isOpen = !this.isOpen;
      }
    },
  },
  beforeMount() {
    if (window.screen.width > 800){
      this.isOpen = true
    }
  },
};
</script>

<style scoped>
@font-face {
  font-family: "AudioNugget";
  src: url("src/assets/fonts/AudioNugget.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

.show-button {
  display: none;
  background-color: var(--accent);
  border: none;
  border-radius: 2px;
}
.side-nav {
  background-color: transparent;
  font-family: AudioNugget;
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
  color: var(
    --accent,
    #ffffff
  ); /* Replace with your CSS variable or fallback */
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
