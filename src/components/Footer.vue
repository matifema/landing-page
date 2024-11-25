<template>
  <footer class="footer">
    <div class="scrolling-container">
      <div class="scrolling-text">
        UNDER CONSTRUCTION | UNDER CONSTRUCTION | UNDER CONSTRUCTION | UNDER
        CONSTRUCTION | UNDER CONSTRUCTION | UNDER CONSTRUCTION | UNDER
        CONSTRUCTION | UNDER CONSTRUCTION | UNDER CONSTRUCTION | UNDER
        CONSTRUCTION | UNDER CONSTRUCTION | UNDER CONSTRUCTION | UNDER
        CONSTRUCTION | UNDER CONSTRUCTION | UNDER CONSTRUCTION | UNDER
        CONSTRUCTION | UNDER CONSTRUCTION | UNDER CONSTRUCTION | UNDER
        CONSTRUCTION | UNDER CONSTRUCTION | UNDER CONSTRUCTION | UNDER
        CONSTRUCTION | UNDER CONSTRUCTION | UNDER CONSTRUCTION | UNDER
        CONSTRUCTION | UNDER CONSTRUCTION | UNDER CONSTRUCTION | UNDER
        CONSTRUCTION | UNDER CONSTRUCTION | UNDER CONSTRUCTION | UNDER
        CONSTRUCTION | UNDER CONSTRUCTION | UNDER CONSTRUCTION | UNDER
        CONSTRUCTION | UNDER CONSTRUCTION | UNDER CONSTRUCTION | UNDER
        CONSTRUCTION | UNDER CONSTRUCTION | UNDER CONSTRUCTION | UNDER
        CONSTRUCTION |
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
@font-face {
  font-family: "CustomFont";
  src: url("@/assets/fonts/NeuePixelSans.ttf") format("truetype");
}
.footer {
  background-color: #ff0000;
  color: #000000;
  font-family: "CustomFont", sans-serif;
  padding: 10px 0;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  overflow: hidden;
  white-space: nowrap;
}
.scrolling-container {
  display: flex;
  width: 200%; /* Ensure there's enough space for looping */
  animation: scroll-left 20s linear infinite; /* Smooth, infinite scrolling */
}

.scrolling-text {
  display: inline-block;
  white-space: nowrap; /* Prevent wrapping */
  width: 100%; /* Fill available space */
  text-align: left;
  padding-right: 2rem; /* Add spacing between repeated text */
}

@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
