<template class="mobileText">
  <main>
    <p class="title">unfinished projects</p>
    <p class="text">hmmmm idk honestly</p>
    <hr />
    <table class="text">
      <thead></thead>
      <tbody>
        <tr>
        <td><RouterLink to="/tracklistify">- tracklistify</RouterLink></td>
      </tr>
      <tr>
        <td><RouterLink to="/gameoflife">- conway's game of life</RouterLink></td>
      </tr>
      <tr>
        <td><a href="https://github.com/matifema/tinyChessBot">- octoBot</a></td>
      </tr>
      <tr>
        <td><a href="https://github.com/matifema/Jbomber">- JBomber</a></td>
      </tr>
      <tr>
        <td><a href="https://github.com/matifema/GimmiePass">- GimmiePass</a></td>
      </tr>
      </tbody>
    </table>
  </main>
</template>

<style scoped>
.title {
  text-align: left;
  color: var(--accent);
}
.text tr {
  text-align: center;
  margin-bottom: 1rem;
  color: var(--text-color, #333);
}
</style>
