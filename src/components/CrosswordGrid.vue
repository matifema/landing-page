<template>
  <div
    class="crossword-grid"
    tabindex="0"
    @keydown.stop.prevent="handleKeydown"
  >
    <div
      v-for="cell in gridData"
      :key="cell.index"
      class="cell"
      :class="{
        black: cell.isBlack,
        focused: isFocused(cell),
        highlight: isRowOrColHighlight(cell),
      }"
      @click="handleCellClick(cell.index)"
    >
      <!-- Black square -->
      <div v-if="cell.isBlack" class="black-square"></div>

      <!-- White square -->
      <div v-else class="white-square">
        <div class="letter">
          {{ cell.letter }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CrosswordGrid",
  props: {
    gridData: {
      type: Array,
      required: true,
    },
    modelValueCurrentCellIndex: {
      type: Number,
      default: 0,
    },
    modelValueDirection: {
      type: String,
      default: "across",
    },
  },
  emits: [
    "update:modelValueCurrentCellIndex",
    "update:modelValueDirection",
    "updateGrid",
  ],
  data() {
    return {
      internalCurrentCellIndex: this.modelValueCurrentCellIndex,
      internalDirection: this.modelValueDirection,
    };
  },
  watch: {
    modelValueCurrentCellIndex(newVal) {
      this.internalCurrentCellIndex = newVal;
    },
    modelValueDirection(newVal) {
      this.internalDirection = newVal;
    },
  },
  computed: {
    size() {
      // e.g., for a 5x5 puzzle, length will be 25
      // so size = sqrt(25) = 5
      return Math.sqrt(this.gridData.length);
    },
  },
  methods: {
    // Helpers for focusing and highlighting
    isFocused(cell) {
      return cell.index === this.internalCurrentCellIndex;
    },
    isRowOrColHighlight(cell) {
      if (cell.isBlack) return false;
      const focusCell = this.gridData[this.internalCurrentCellIndex];
      if (!focusCell) return false;

      if (this.internalDirection === "across") {
        // highlight entire row
        return cell.row === focusCell.row;
      } else {
        // highlight entire column
        return cell.col === focusCell.col;
      }
    },

    updateCurrentCellIndex(val) {
      this.internalCurrentCellIndex = val;
      this.$emit("update:modelValueCurrentCellIndex", val);
    },
    updateDirection(dir) {
      this.internalDirection = dir;
      this.$emit("update:modelValueDirection", dir);
    },

    handleCellClick(cellIndex) {
      // If clicking the same cell again, toggle direction
      if (cellIndex === this.internalCurrentCellIndex) {
        this.updateDirection(
          this.internalDirection === "across" ? "down" : "across"
        );
      } else {
        this.updateCurrentCellIndex(cellIndex);
      }
    },

    handleKeydown(e) {
      const key = e.key;

      // 1) Letter A-Z
      if (/^[a-zA-Z]$/.test(key)) {
        this.insertLetter(key.toUpperCase());
        return;
      }

      // 2) Backspace or Delete
      if (key === "Backspace" || key === "Delete") {
        this.handleBackspace();
        return;
      }

      // 3) Arrows for navigation
      if (key === "ArrowLeft") {
        this.moveFocus(-1, "across");
        return;
      }
      if (key === "ArrowRight") {
        this.moveFocus(1, "across");
        return;
      }
      if (key === "ArrowUp") {
        this.moveFocus(-1, "down");
        return;
      }
      if (key === "ArrowDown") {
        this.moveFocus(1, "down");
        return;
      }

      // 4) Tab to jump forward/back through cells
      if (key === "Tab") {
        const step = e.shiftKey ? -1 : 1;
        this.moveToNextCell(step);
        return;
      }
    },

    insertLetter(letter) {
      const newGrid = [...this.gridData];
      const cell = newGrid[this.internalCurrentCellIndex];
      if (!cell.isBlack) {
        cell.letter = letter;
      }
      this.$emit("updateGrid", newGrid);

      // Move forward in the current direction
      this.moveFocus(1, this.internalDirection);
    },

    handleBackspace() {
      const newGrid = [...this.gridData];
      const cell = newGrid[this.internalCurrentCellIndex];
      if (!cell.isBlack) {
        cell.letter = "";
      }
      this.$emit("updateGrid", newGrid);

      // Move backward in the current direction
      this.moveFocus(-1, this.internalDirection);
    },

    moveFocus(step, direction) {
      /*
        Move left/right if direction=across,
        move up/down if direction=down.
        Skip black squares or out-of-bounds.
      */
      let newIndex = this.internalCurrentCellIndex;
      let found = false;

      while (!found) {
        if (direction === "across") {
          // Move within the same row
          newIndex += step;
          // Stop if out of total range or we jumped to a different row
          if (newIndex < 0 || newIndex >= this.gridData.length) break;
          if (
            this.gridData[newIndex].row !==
            this.gridData[this.internalCurrentCellIndex].row
          )
            break;
        } else {
          // Move in the same column
          const offset = step * this.size;
          newIndex += offset;
          if (newIndex < 0 || newIndex >= this.gridData.length) break;
        }

        // If black, keep going
        if (!this.gridData[newIndex].isBlack) {
          found = true;
        }
      }

      if (found) {
        this.updateCurrentCellIndex(newIndex);
      }
    },

    moveToNextCell(step) {
      /*
        Simple approach to tabbing:
        step=1 => go forward
        step=-1 => go backward
        skip black squares
      */
      let newIndex = this.internalCurrentCellIndex;
      for (let i = 0; i < this.gridData.length; i++) {
        newIndex += step;
        if (newIndex < 0) {
          newIndex = this.gridData.length - 1;
        } else if (newIndex >= this.gridData.length) {
          newIndex = 0;
        }
        if (!this.gridData[newIndex].isBlack) {
          this.updateCurrentCellIndex(newIndex);
          break;
        }
      }
    },
  },
};
</script>

<style scoped>
.crossword-grid {
  display: grid;
  /* e.g. 5x5 grid if puzzle is 5 rows x 5 columns */
  grid-template-columns: repeat(5, 80px);
  grid-template-rows: repeat(5, 80px);
  gap: 1px;
  outline: none; /* needed because of tabindex="0" */
  margin: 0 auto;
}

.cell {
  position: relative;
  width: 80px;
  height: 80px;
  background-color: #fff;
}

.black-square {
  width: 100%;
  height: 100%;
  background-color: rgb(36, 36, 36);
}

.white-square {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.letter {
  font-size: 25px;
  color: black;
  font-weight: bold;
}

/* Focus outline on the currently selected cell */
.focused {
  outline: 2px solid red;
  outline-offset: -2px;
}

/* Highlight entire row/column in yellow */
.highlight {
  background-color: rgb(255, 255, 145);
}
</style>
