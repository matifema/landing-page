<script setup></script>

<template>
  <main>
    <div class="modal-mask">
        <div class="helpcard">
          commands: <br>
          • help/h  → display this card <br>
          • home → home page <br>
          • links → links page <br>
          • projects → projects page <br>
          • about → about page <br>
        </div>
    </div>
  </main>
</template>

<style scoped>
.helpcard {
  padding: 1vw;
  background-color: var(--color-background);
  border-radius: 20px;
  width: 60%;
  font-size: 1.2rem;
}
.modal-mask {
  display: flex;
  justify-content: center;
  align-content: center;
  position: fixed;
  z-index: 9998;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
}
@media(min-width: 800px) {
  .helpcard {
    width: 20%;
  }
}
</style>