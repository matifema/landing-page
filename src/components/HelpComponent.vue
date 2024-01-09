<script setup>

</script>

<template>
  <div class="modal-mask">
      <div class="helpcard">
        commands: <br>
        • help/h  → display this card <br>
        • home → home page <br>
        • links → links page <br>
        • projects → projects page <br>
        • about → about page <br>
        more stuff soon...
      </div>
  </div>
</template>

<style scoped>
.helpcard {
  padding: 1vw;
  background-color: var(--color-background);
  border-radius: 20px;
  width: 20%;
  font-size: 1.2rem;
}
.modal-mask {
  display: flex;
  transition: opacity 0.3s ease;
  position: absolute;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
}
</style>