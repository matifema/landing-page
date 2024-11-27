<template>
  <form @submit.prevent="addLink">
    <div class="form-group">
      <label for="name">Link Name:</label>
      <input
        type="text"
        id="name"
        v-model="linkName"
        placeholder="The link's name"
        required
      />
    </div>
    <div class="form-group">
      <label for="url">Link URL:</label>
      <input
        type="url"
        id="url"
        v-model="linkUrl"
        placeholder="https://example.com"
        required
      />
    </div>
    <button type="submit" class="btn">Add Link</button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      linkName: "",
      linkUrl: "",
    };
  },
  methods: {
    addLink() {
      if (this.linkName && this.linkUrl) {
        // 🚀 Do something meaningful, like emitting this data.
        console.log("Added Link:", { name: this.linkName, url: this.linkUrl });
        this.linkName = "";
        this.linkUrl = "";
      } else {
        alert("Both fields are required, champ.");
      }
    },
  },
};
</script>
<style scoped>
form {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}
input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
input:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background: #007bff;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}
button:hover {
  background: #0056b3;
}
</style>
