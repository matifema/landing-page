<template>
  <div class="clue-list">
    <!-- Across Clues -->
    <div class="clue-section">
      <h2>Across</h2>
      <ul>
        <li
          v-for="item in acrossClues"
          :key="item.number"
          class="clue-item"
          @click="handleClueClick(item, 'across')"
        >
          <strong>{{ item.number }}.</strong> {{ item.clue }}
        </li>
      </ul>
    </div>

    <!-- Down Clues -->
    <div class="clue-section">
      <h2>Down</h2>
      <ul>
        <li
          v-for="item in downClues"
          :key="item.number"
          class="clue-item"
        >
          <strong>{{ item.number }}.</strong> {{ item.clue }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClueList",
  props: {
    acrossClues: {
      type: Array,
      required: true,
    },
    downClues: {
      type: Array,
      required: true,
    },
  }
};
</script>

<style scoped>
.clue-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 300px;
  margin: 0 auto;
}

.clue-section h2 {
  margin-bottom: 8px;
  text-decoration: underline;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.clue-item {
  cursor: pointer;
  margin: 4px 0;
  line-height: 1.4;
  transition: background-color 0.2s;
}

.clue-item:hover {
  background-color: #f0f0f0;
}
</style>
