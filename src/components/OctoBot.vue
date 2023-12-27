<script setup>
</script>

<template>
    <div class="chessboard">
        <div class="grid-item" v-for="n in 64">
            <div class="cell" :style="{ backgroundColor: n % 2 === 0 ? 'black' : 'white' }"></div>
        </div>
    </div>
</template>

<style scoped>
.chessboard {
    justify-items: center;
    display: grid;
    grid-template-columns: auto auto auto auto auto auto auto auto;
}
.cell {
    height: 5vh;
    width: 5vh;
    background-color: aliceblue;
}
</style>