<template>
  <div>
    <h1>🎅🏻 Happy Christmas Amore ☃️</h1>
    <p style="max-width: 750px; text-align: left;"> This might be the nerdiest gift ever buuuut... I know how much you like crosswords so I made this little clone of the NY times games for you (which you got me hooked to btw), I love you so so so much. Now hurry up the clock's ticking!!!</p>
    <!-- Timer display -->
    <div class="timer">Time: {{ elapsedTime }}s</div>

    <div style="display: flex; flex-direction: row; gap: 50px;">
        <!-- The crossword grid -->
        <CrosswordGrid
          :gridData="gridData"
          v-model:currentCellIndex="currentCellIndex"
          v-model:direction="direction"
          @updateGrid="handleGridUpdate"
        />
    
        <!-- Clue List-->
        <ClueList
          :acrossClues="acrossClues"
          :downClues="downClues"
        />
    </div>

    <!-- Congratulation modal (shown when puzzle is complete) -->
    <div style="background-image: url('/hehe.jpg'); background-size:cover;" v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div style="font-weight:bolder; color: black;" class="modal-content">
        <h2>BRAVISSIMA!</h2>
        <p>You’ve completed the crossword in {{ elapsedTime }}s!!!</p>
        <button @click="closeModal">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import CrosswordGrid from "@/components/CrosswordGrid.vue";
import ClueList from "@/components/ClueList.vue";

export default {
  name: "App",
  components: {
    CrosswordGrid,
    ClueList,
  },
  data() {
    return {
      // 5 rows of 5 chars each: '-' is a black square
      puzzleRows: ["GREGG", "----O", "CABIN", "O---K", "WELLY"],
      acrossClues: [
        { number: 1, clue: 'Your favorite English enstablishment.' },
        { number: 3, clue: 'We want to buy one in the Alps.' },
        { number: 5, clue: 'He loves me more than you. And I couldn\'t be happier.' },
        // ...
      ],
      downClues: [
        { number: 3, clue: 'You got chased my one once. It was not nice.' },
        { number: 5, clue: '"It\'s _____ time!"' },
        // ...
      ],
      gridData: [],

      // Track which cell is currently focused
      currentCellIndex: 0,

      // 'across' or 'down'
      direction: "across",

      // Timer
      elapsedTime: 0,
      timerId: null,

      // Modal
      showModal: false,
    };
  },
  mounted() {
    this.initGridData();
    this.startTimer();
  },
  unmounted() {
    this.stopTimer();
  },
  methods: {
    initGridData() {
      // Convert puzzleRows into an array of cell objects
      // each containing row, col, solution letter, typed letter, isBlack, etc.
      let index = 0;
      const tempGrid = [];

      for (let row = 0; row < this.puzzleRows.length; row++) {
        const rowString = this.puzzleRows[row];
        for (let col = 0; col < rowString.length; col++) {
          const char = rowString[col];
          tempGrid.push({
            index,
            row,
            col,
            solution: char === "-" ? "" : char.toUpperCase(),
            letter: "", // what the user types
            isBlack: char === "-",
          });
          index++;
        }
      }

      this.gridData = tempGrid;
    },

    handleGridUpdate(updatedGrid) {
      this.gridData = updatedGrid;
      this.checkCompletion();
    },

    checkCompletion() {
      // If every white square’s letter matches its solution, puzzle is done
      for (let cell of this.gridData) {
        if (!cell.isBlack) {
          // If user letter is empty or doesn't match
          if (!cell.letter || cell.letter.toUpperCase() !== cell.solution) {
            return;
          }
        }
      }
      // If we get here, puzzle is complete
      this.stopTimer();
      this.showModal = true;
    },

    startTimer() {
      this.timerId = setInterval(() => {
        this.elapsedTime++;
      }, 1000);
    },
    stopTimer() {
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
    },

    closeModal() {
      this.showModal = false;
    },
  },
};
</script>

<style scoped>
.app-container {
  max-width: 600px;
  margin: 0 auto;
  font-family: sans-serif;
  text-align: center;
}

.timer {
  margin: 10px 0;
  font-size: 18px;
}

/* Simple modal styling */
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
