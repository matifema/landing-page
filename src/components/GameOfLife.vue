<script setup>
import { ref, onMounted, watch } from 'vue';

// Props for controlling the component
const props = defineProps({
  showControls: {
    type: Boolean,
    default: true,
  },
  initialState: {
    type: String,
    default: null,
  },
  paneHeight: {
    type: String,
    default: '600px',
  },
  paneWidth: {
    type: String,
    default: '600px',
  },
  autoStart: {
    type: Boolean,
    default: false,
  },
  speedPercentage: {
    type: Number,
    default: 100, // Default to normal speed
  },
});

const tiles = ref([]);
const numRows = ref(0);
const numCols = ref(0);
const intervalDuration = ref(950);
const isRunning = ref(false);
const info = ref(false);

// On mount, calculate the grid and generate tiles
onMounted(() => {
  calculateGrid();
  if (props.initialState) {
    loadStateFromString(props.initialState);
  } else {
    generateTiles();
    randomizeTiles();
  }

  if (props.autoStart) {
    start();
  }
});

// Watch for pane size changes
watch([() => props.paneHeight, () => props.paneWidth], calculateGrid);

// Calculate grid based on pane dimensions
function calculateGrid() {
  const tileWidth = 32; // 30px tile + 2px gap
  numCols.value = Math.floor(parseInt(props.paneWidth) / tileWidth);
  numRows.value = Math.floor(parseInt(props.paneHeight) / tileWidth);
  generateTiles();
}

// Generate empty grid
function generateTiles() {
  tiles.value = Array.from({ length: numRows.value * numCols.value }, () => ({ alive: false }));
}

// Toggle tile state
function toggleTile(tile) {
  tile.alive = !tile.alive;
}

// Randomize tiles
function randomizeTiles() {
  tiles.value = tiles.value.map(() => ({ alive: Math.random() < 0.3 }));
}

// Save the current grid state
function saveState() {
  const stateString = tiles.value.map(tile => (tile.alive ? '1' : '0')).join(',');
  alert(`Saved State:\n\n${stateString}`);
}

// Load state from a string
function loadStateFromString(stateString) {
  const states = stateString.split(',').map(s => s === '1');
  tiles.value = states.map(alive => ({ alive }));
}

// Show input prompt for loading a state
function loadState() {
  const stateString = prompt('Enter the grid state (comma-separated 1s and 0s):');
  if (stateString) {
    loadStateFromString(stateString);
  }
}

function showinfo() {
  info.value = !info.value;
}

// Start and stop the game cycle
function start() {
  if (isRunning.value) return;
  isRunning.value = true;
  runGameCycle();
}

function stop() {
  isRunning.value = false;
}

function reset() {
  stop();
  generateTiles();
}

// Game cycle logic
function runGameCycle() {
  if (!isRunning.value) return;

  const nextState = tiles.value.map((tile, index) => {
    const aliveNeighbors = getNeighbours(index);
    const isAlive = tile.alive;
    return { alive: (isAlive && aliveNeighbors === 2) || aliveNeighbors === 3 };
  });

  tiles.value = nextState;
  setTimeout(runGameCycle, 1000 - (intervalDuration.value * props.speedPercentage / 100));
}

// Get the number of alive neighbors for a tile
function getNeighbours(tileIndex) {
  const directions = [
    -1, 1,
    -numCols.value, numCols.value,
    -numCols.value - 1, -numCols.value + 1,
    numCols.value - 1, numCols.value + 1
  ];

  return directions.reduce((count, direction) => {
    const neighborIndex = tileIndex + direction;
    if (
      neighborIndex >= 0 &&
      neighborIndex < numRows.value * numCols.value &&
      tiles.value[neighborIndex].alive
    ) {
      count++;
    }
    return count;
  }, 0);
}
</script>

<template>
  <main class="flex items-center justify-center min-h-screen bg-gray-900 py-8">
    <div class="game-container bg-black rounded-lg shadow-lg p-4 relative">
      <!-- Grid Pane -->
      <div
        id="pane"
        class="pane"
        :style="{
          height: paneHeight,
          width: paneWidth,
          gridTemplateColumns: `repeat(${numCols}, 32px)`,
        }"
      >
        <div
          v-for="(tile, index) in tiles"
          :key="index"
          class="tile"
          :class="{ aliveTile: tile.alive, deadTile: !tile.alive }"
          @click="toggleTile(tile)"
        ></div>
      </div>

      <!-- Controls (Shown Conditionally) -->
      <div class="controls" v-if="showControls">
        <button @click="showinfo">Info</button>
        <button @click="start">Start</button>
        <button @click="stop">Pause</button>
        <button @click="reset">Reset</button>
        <button @click="randomizeTiles">Randomize</button>
        <button @click="saveState">Save State</button>
        <button @click="loadState">Load State</button>
        <div class="slidecontainer mt-4">
          <input type="range" min="50" max="950" v-model="intervalDuration" class="slider" />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* Pane Styles */
.pane {
  display: grid;
  gap: 2px;
  background-color: transparent;
  margin: 0 auto;
}

/* Tile Styling */
.tile {
  width: 30px;
  height: 30px;
  transition: background-color 0.2s ease;
}

/* Alive and Dead Tile Styles */
.deadTile {
  background-color: transparent;
}

.aliveTile {
  background-color: var(--accent);
  animation: pop 0.15s ease;
}

/* Controls */
.controls {
  background-color: rgba(5, 5, 5, 0.9);
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  margin-top: 1rem;
}

button {
  font-size: 1rem;
  color: white;
  background-color: #007BFF;
  padding: 0.5rem 1rem;
  margin: 0.3rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

/* Animation for alive tiles */
@keyframes pop {
  0% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
