<template>
  <div class="keyboard-container">
    <!-- First Row -->
    <div class="keyboard-row">
      <div
        v-for="key in firstRowKeys"
        :key="key"
        class="keyboard-key"
        @click="emitKeyPress(key)"
      >
        {{ key }}
      </div>
    </div>
    <!-- Second Row -->
    <div class="keyboard-row">
      <div
        v-for="key in secondRowKeys"
        :key="key"
        class="keyboard-key"
        @click="emitKeyPress(key)"
      >
        {{ key }}
      </div>
    </div>
    <!-- Third Row -->
    <div class="keyboard-row">
      <div
        v-for="key in thirdRowKeys"
        :key="key"
        class="keyboard-key"
        @click="emitKeyPress(key)"
      >
        {{ key }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from "vue";

// QWERTY Layout Rows
const firstRowKeys = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const secondRowKeys = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const thirdRowKeys = ["Z", "X", "C", "V", "B", "N", "M", "←"];

// Emits the key press event
const emit = defineEmits(["keyPress"]);

// Emit a synthetic KeyboardEvent
const emitKeyPress = (key) => {
  if(key == "←"){
    key = "Backspace";
  }
  const event = new KeyboardEvent("keydown", { key });
  emit("keyPress", event);
};
</script>

<style scoped>
.keyboard-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding-bottom: 100px;
}

.keyboard-row {
  display: grid;
  gap: 5px;
}

/* Responsive grid template columns for each row */
.keyboard-row:nth-child(1) {
  grid-template-columns: repeat(10, 1fr); /* 10 keys */
}
.keyboard-row:nth-child(2) {
  grid-template-columns: repeat(9, 1fr); /* 9 keys */
}
.keyboard-row:nth-child(3) {
  grid-template-columns: repeat(9, 1fr); /* 9 keys */
}

.keyboard-key {
  background-color: #007bff;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s ease, transform 0.2s ease;
  min-width: 0;
}

.keyboard-key:hover {
  background-color: #0056b3;
}

.keyboard-key:active {
  transform: scale(0.95);
}

/* Adjust key padding based on screen size for responsiveness */
@media (max-width: 768px) {
  .keyboard-key {
    padding: 10px;
    font-size: 2rem;
  }

  .keyboard-row {
    gap: 5px;
  }
}

@media (max-width: 480px) {
  .keyboard-key {
    padding: 6px;
    font-size: 1.3rem;
  }

  .keyboard-row {
    gap: 3px;
  }
}
</style>
