<script setup>
import { ref, onMounted, computed } from 'vue';

const tiles = ref([]);
const numRows = ref(0);
const numCols = ref(0);
const intervalDuration = ref(500);
const isRunning = ref(false);
const info = ref(false);

onMounted(() => {
  calculateGrid();
  generateTiles();
  randomizeTiles();
});

window.addEventListener('resize', () => {
  calculateGrid();
  generateTiles();
});

function showinfo(){
  info.value = !info.value;
}

function calculateGrid() {
  const tileWidth = 30 + 2; // width of a tile in pixels + margin
  numCols.value = Math.floor(window.innerWidth / tileWidth);
  numRows.value = Math.floor(window.innerHeight / tileWidth);
}

function generateTiles() {
  tiles.value = [];
  for (let i = 0; i < numRows.value * numCols.value; i++) {
    tiles.value.push({ alive: false });
  }
}

function toggleTile(tile) {
  tile.alive = !tile.alive;
  getNeighbours(tiles.value.indexOf(tile))
}

function getNeighbours(tileIndex) {
  var neighbors = 0;
  const directions = [
    -1, 1, // left, right
    -numCols.value, +numCols.value, // above, below
    -numCols.value - 1, -numCols.value + 1, // top-left, top-right
    +numCols.value - 1, +numCols.value + 1 // bottom-left, bottom-right
  ];

  directions.forEach(direction => {
    const neighborIndex = tileIndex + direction;
    if (neighborIndex >= 0 && neighborIndex < numRows.value * numCols.value) {
      const neighborCol = neighborIndex % numCols.value;
      const tileCol = tileIndex % numCols.value;
      if (Math.abs(neighborCol - tileCol) <= 1 && tiles.value[neighborIndex].alive) {
        neighbors += 1;
      }
    }
  });
  return neighbors;
}

function randomizeTiles() {
  tiles.value = tiles.value.map(() => {
    return { alive: Math.random() < 0.3 }; // 30% chance of being alive
  });
}

function runGameCycle() {
  if (!isRunning.value) {
    return;
  }

  const nextState = tiles.value.map(tile => ({ ...tile }));

  tiles.value.forEach((tile, index) => {
    const aliveNeighbors = getNeighbours(index);
    const isAlive = tile.alive;

    if (isAlive && (aliveNeighbors < 2 || aliveNeighbors > 3)) {
      nextState[index].alive = false; // die of underpopulation or overpopulation
    } else if (!isAlive && aliveNeighbors === 3) {
      nextState[index].alive = true; // birth condition
    }
  });

  tiles.value = nextState;

  setTimeout(runGameCycle, 1000-intervalDuration.value);
}

function start() {
  if (isRunning.value) {
    return;
  }
  isRunning.value = true;
  runGameCycle();
}

function stop() {
  isRunning.value = false; // This will stop the runGameCycle loop
}

function reset() {
  stop();
  generateTiles(); // reset grid
}

</script>

<template>
  <main>
    <div id="pane" class="pane">
      <div v-for="(tile, index) in tiles"
        class="tile" 
        :class="{ aliveTile: tile.alive, deadTile: !tile.alive }"
        @click="toggleTile(tile)">
      </div>
    </div>
    <div class="controls">
      <button @click="showinfo">info</button>
      <button @click="start">start</button>
      <button @click="stop">pause</button>
      <button @click="reset">reset</button>
      <button @click="randomizeTiles">randomize</button>
      <div class="slidecontainer">
        <input type="range" min="50" max="950" v-model="intervalDuration" class="slider" id="myRange">
      </div>
      <p v-if="info">
        Conway's Game of Life rules: 
        <p>1. if an alive tiles has 1 or less alive neighbors, it dies. </p>
        <p>2. if a dead tile has 3 alive neighbors, it becomes alive.</p>
        <p>3. if an alive tile has 2 or 3 neighbors, it keeps living</p>
        <p>4. if an alive tile has 4 or more alive neighbors, it dies.</p>
      </p>
    </div>
  </main>
</template>

<style scoped>
.pane {
  overflow: hidden;
  justify-content: center;
  align-content: center;
  background-color: #1D2D44;
  display: flex;
  position: absolute;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  max-height: 100%;
}
.controls{
  background-color: rgba(5, 5, 5, 0.8);
  border-radius: 20px;
  padding: 20px;
  position: absolute;
  width: fit-content;
  bottom: 0;
  left: 0;
  z-index: 9999;
}

button{
  font-size: 1.2rem;
}
.slider{
  min-width: 100%;
}
.tile {
  width: 30px;
  height: 30px;
  margin: 1px;
}
.deadTile{
  background-color: #1D2D44;
}
.aliveTile{
  background-color: rgb(196, 196, 196);
}
</style>