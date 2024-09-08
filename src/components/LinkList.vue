<template>
  <main>
    <p class="text" style="text-align: center;">
      A collection of endpoints from all around the old wild web: <br>
      exploit and explore the limits of the clearnet!
    </p>
    <hr>
    <div class="linkslist">
      <a v-for="(entry, index) in entries" :key="index" :href="entry.link" target="_blank" rel="noopener noreferrer" class="entry-link">
        <div class="card text">
          <h3>{{ entry.title }}</h3>
          <span>{{ entry.description }}</span>
        </div>
      </a>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      entries: [],
    };
  },
  created() {
    this.fetchEntriesFromJSON();
  },
  methods: {
    async fetchEntriesFromJSON() {
      try {
        const response = await fetch("entries.json"); // Replace with actual path
        const data = await response.json();
        this.entries = data;
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    },
  },
};
</script>

<style scoped>
a {
  color: var(--accent);
}
.linkslist {
  overflow-y: visible;
  height: 100vh;
}
@media(min-width: 800px) {
    .linkslist {
    overflow-y: scroll;
    height: 500px;
    }
    .linkslist::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    }
    .linkslist::-webkit-scrollbar-track {
    border-radius: 10px;
    background: rgba(0,0,0,0.1);
    }
    .linkslist::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background: rgba(0,0,0,0.2);
    }
    .linkslist::-webkit-scrollbar-thumb:hover{
        background: rgba(0,0,0,0.4);
    }
    .linkslist::-webkit-scrollbar-thumb:active{
        background: rgba(0,0,0,.9);
    }
}
</style>