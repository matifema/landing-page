<template>
  <main>
    <h2 class="title">cool websites</h2>
    <p class="text">my collection of over 3000 endpoints to anywhere</p>
    <hr />
    <button
      v-if="!showList && !loading"
      @click="loadEntries"
      class="load-button"
    >
      load em up
    </button>
    <button v-if="!loading" @click="goToRandomPage" class="load-button">
      visit random
    </button>
    <br />
    <p v-if="error" class="error-text">{{ error }}</p>
    <div v-if="showList" class="linkslist">
      <a
        v-for="(entry, index) in visibleEntries"
        :key="index"
        :href="entry.link"
        target="_blank"
        rel="noopener noreferrer"
        class="entry-link"
      >
        <div class="card">
          <h3>{{ entry.title }}</h3>
        </div>
      </a>
      <button
        v-if="hasMoreEntries"
        @click="loadMoreEntries"
        class="load-more-button"
      >
        load more
      </button>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      entries: [],
      visibleEntries: [],
      loading: false,
      error: null,
      showList: false,
      loadAmount: 50,
    };
  },
  computed: {
    hasMoreEntries() {
      return this.visibleEntries.length < this.entries.length;
    },
  },
  methods: {
    async fetchEntriesFromJSON() {
      try {
        this.loading = true;
        const response = await fetch("entries.json");
        const data = await response.json();
        this.entries = data;
      } catch (error) {
        this.error = "Failed to load entries. Please try again later.";
        console.error("Error fetching entries:", error);
      } finally {
        this.loading = false;
      }
    },
    loadEntries() {
      this.showList = true;
      this.addMoreEntries();
    },
    loadMoreEntries() {
      this.addMoreEntries();
    },
    addMoreEntries() {
      const start = this.visibleEntries.length;
      const end = start + this.loadAmount;
      if (start < this.entries.length) {
        this.visibleEntries.push(...this.entries.slice(start, end));
      }
    },
    goToRandomPage() {
      if (!this.entries.length) {
        console.error("bruh, your pages list is empty.");
        return;
      }
      const randomIndex = Math.floor(Math.random() * this.entries.length);
      const randomPage = this.entries[randomIndex];

      window.open(randomPage.link, "_blank").focus();
    },
  },
  async created() {
    await this.fetchEntriesFromJSON();
  },
};
</script>

<style scoped>
@font-face {
  font-family: "CustomFont";
  src: url("@/assets/fonts/NeuePixelSans.ttf") format("truetype");
}
.title {
  color: var(--accent);
}
button {
  font-family: CustomFont;
}
.load-button,
.load-more-button {
  display: block;
  margin: 1rem auto;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: white;
  background-color: var(--accent, #007bff);
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.load-button:hover,
.load-more-button:hover {
  background-color: var(--accent-dark, #0056b3);
}

.error-text {
  color: red;
  text-align: center;
}

.linkslist {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  align-items: flex-start; /* Align entries to the left */
  padding: 0 1rem;
}

.entry-link {
  text-decoration: none;
  color: var(--text-color, #333);
}

.entry-link:hover {
  background-color: rgba(0, 123, 255, 0.1);
}

.card {
  padding: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  width: 100%; /* Stretch the card to full width of the container */
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
}
</style>
