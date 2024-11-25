<template>
  <header class="header">
    <div class="scrolling-container">
      <div class="scrolling-text">
        MATIFEMA | MATIFEMA | MATIFEMA | MATIFEMA | MATIFEMA | MATIFEMA |
        MATIFEMA | MATIFEMA | MATIFEMA | MATIFEMA | MATIFEMA | MATIFEMA |
        MATIFEMA | MATIFEMA | MATIFEMA | MATIFEMA | MATIFEMA | MATIFEMA |
        MATIFEMA | MATIFEMA | MATIFEMA | MATIFEMA | MATIFEMA | MATIFEMA |
        MATIFEMA | MATIFEMA | MATIFEMA | MATIFEMA | MATIFEMA | MATIFEMA |
        MATIFEMA | MATIFEMA | MATIFEMA | MATIFEMA | MATIFEMA | MATIFEMA |
        MATIFEMA | MATIFEMA | MATIFEMA | MATIFEMA | MATIFEMA | MATIFEMA |
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
@font-face {
  font-family: "CustomFont";
  src: url("@/assets/fonts/NeuePixelSans.ttf") format("truetype");
}
.header {
  background-color: #ff0000;
  color: #000000;
  font-family: "CustomFont", sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px; /* Adjust as needed */
  overflow: hidden; /* Prevent overflow */
  display: flex;
  align-items: center; /* Vertically align content */
  z-index: 1001;
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
