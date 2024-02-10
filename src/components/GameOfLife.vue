<script setup>
import { ref, onMounted, computed } from 'vue';

const tiles = ref([]);
const numRows = ref(0);
const numCols = ref(0);

onMounted(() => {
  calculateGrid();
  generateTiles();
});

window.addEventListener('resize', () => {
  calculateGrid();
  generateTiles();
});

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
  console.log(tile.alive, tiles.value.indexOf(tile))
  getNeighbours(tiles.value.indexOf(tile))
}

function start() {
  // Start game cycle
}

function getNeighbours(tileIndex) {
  // Calculate neighbours for the tile at tileIndex
  let y = Math.floor(tileIndex/numCols.value);
  let x = Math.floor(tileIndex - y * numCols.value);
  console.log(x,y)

}

function pause(){
  // Pause game cycle
}

function stop(){
  // Stop game cycle
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
      <button>start</button>
      <button>pause</button>
      <button>reset</button>
      <div class="slidecontainer">
        <input type="range" min="1" max="100" value="50" class="slider" id="myRange">
      </div>
    </div>
  </main>
</template>

<style scoped>
.pane {
  overflow: hidden;
  justify-content: center;
  align-content: center;
  background-color: black;
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
  background-color: rgba(5, 5, 5, 0.535);
  border-radius: 20px;
  padding: 20px;
  position: absolute;
  bottom: 0;
  z-index: 9999;
}
.tile {
  width: 30px;
  height: 30px;
  margin: 1px;
}
.deadTile{
  background-color: rgb(37, 37, 37);
}
.aliveTile{
  background-color: rgb(196, 196, 196);
}
</style>