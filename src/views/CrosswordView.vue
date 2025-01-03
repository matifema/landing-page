<template>
  <div class="app-container">
    <h1>🎅🏻 Merry Christmas Amore ☃️</h1>
    <p class="description">
      This might be the nerdiest gift ever buuuut... I know how much you obsess
      over crosswords (and you got me hooked on them too), so here's a little
      something for you to solve. Go on, scroll down, the clock's ticking!
    </p>

    <!-- Crossword and Clues -->
    <div class="main-content">
      <div class="crossword-and-clues">
        <!-- Clue List -->
        <ClueList :acrossClues="acrossClues" :downClues="downClues" />

        <!-- Timer display -->
        <div class="timer">Time: {{ elapsedTime }}s</div>

        <!-- Crossword Grid -->
        <CrosswordGrid
          ref="crosswordGrid"
          :gridData="gridData"
          v-model:currentCellIndex="currentCellIndex"
          v-model:direction="direction"
          @updateGrid="handleGridUpdate"
        />

        <!-- Keyboard Component -->
        <div class="keyboard-container">
          <Keyboard @keyPress="handleKeyPress" />
        </div>
      </div>
    </div>

    <!-- Congratulation Modal -->
    <div
      style="background-image: url('/hehe.jpg'); background-size: contain"
      v-if="showModal"
      class="modal-overlay"
      @click.self="closeModal"
    >
      <div class="modal-content">
        <h2>BRAVISSIMA!</h2>
        <p>You've completed the crossword in {{ elapsedTime }}s!!!</p>
        <button @click="closeModal">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import CrosswordGrid from "@/components/CrosswordGrid.vue";
import Keyboard from "@/components/Keyboard.vue";
import ClueList from "@/components/ClueList.vue";

// Puzzle data and state
const puzzleRows = [
  "-AIRFLANE--",
  "-R-E----L--",
  "-T-D---HERE",
  "--------V--",
  "W---BERNARD",
  "E--G----T--",
  "L--R----O--",
  "LIKEITHERE-",
  "Y--G-------",
  "---GONKY---",
  "-JES-------",
];
const puzzleRows2 = ["GREGG", "----O", "CABIN", "O---K", "WELLY"];
const acrossClues = [
  { number: 1, clue: "Was misspelled by both." },
  { number: 2, clue: "Come ... NOW!" },
  { number: 3, clue: "He has gills, is bright red and lives on your wall." },
  { number: 4, clue: "Do you ... ?" },
  { number: 5, clue: "It's that time." },
  { number: 6, clue: "Affermative." },
];
const downClues = [
  { number: 1, clue: "He loves me more that he loves you. (HA-HA!)" },
  { number: 2, clue: "That one bar." },
  { number: 3, clue: "Fiery ..." },
  { number: 4, clue: "Your favorite English enstablishment. (mine too)" },
  { number: 5, clue: "Our origin story." },
];

const gridData = ref([]);
const currentCellIndex = ref(0);
const direction = ref("across");
const crosswordGrid = ref(null);

// Timer
const elapsedTime = ref(0);
let timerId = null;

// Modal state
const showModal = ref(false);

// Initialize the grid data
const initGridData = () => {
  let index = 0;
  const tempGrid = [];
  for (let row = 0; row < puzzleRows.length; row++) {
    const rowString = puzzleRows[row];
    for (let col = 0; col < rowString.length; col++) {
      const char = rowString[col];
      tempGrid.push({
        index,
        row,
        col,
        solution: char === "-" ? "" : char.toUpperCase(),
        letter: "",
        isBlack: char === "-",
      });
      index++;
    }
  }
  gridData.value = tempGrid;
};

// Handle grid update
const handleGridUpdate = (updatedGrid) => {
  gridData.value = updatedGrid;
  checkCompletion();
};

// Check if puzzle is complete
const checkCompletion = () => {
  for (const cell of gridData.value) {
    if (
      !cell.isBlack &&
      (!cell.letter || cell.letter.toUpperCase() !== cell.solution)
    ) {
      return;
    }
  }
  stopTimer();
  showModal.value = true;
};

// Timer controls
const startTimer = () => {
  timerId = setInterval(() => {
    elapsedTime.value++;
  }, 1000);
};
const stopTimer = () => {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
};

// Forward the synthetic KeyboardEvent to the CrosswordGrid's handleKeydown
const handleKeyPress = (event) => {
  if (crosswordGrid.value) {
    crosswordGrid.value.handleKeydown(event);
  }
};

// Modal controls
const closeModal = () => {
  showModal.value = false;
};

// Lifecycle hooks
onMounted(() => {
  initGridData();
  startTimer();
});

onUnmounted(() => {
  stopTimer();
});
</script>

<style scoped>
.app-container {
  max-width: 90%;
  margin: 0 auto;
  font-family: sans-serif;
  text-align: center;
}

.description {
  max-width: 750px;
  margin: 0 auto;
  text-align: left;
  margin-bottom: 20px;
}

.timer {
  margin: 10px 0;
  font-size: 18px;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
}

.crossword-and-clues {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  flex: 2;
}

.keyboard-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Modal Styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #fff;
  border-radius: 6px;
  padding: 20px;
  width: 300px;
}
</style>
