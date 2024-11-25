<template class="mobileText">
  <main>
    <p class="title">
      unfinished projects
    </p>
    <p class="text">
      hmmmm idk honestly
    </p>
    <hr />
    <td class="text ">
      <tr>
        <RouterLink to="/tracklistify">- tracklistify</RouterLink>
      </tr>
      <tr>
        <RouterLink to="/gameoflife">- conway's game of life</RouterLink>
      </tr>
      <tr>
        <a href="https://github.com/matifema/tinyChessBot">- octoBot</a>
      </tr>
      <tr>
        <a href="https://github.com/matifema/Jbomber">- JBomber</a>
      </tr>
      <tr>
        <a href="https://github.com/matifema/GimmiePass">- GimmiePass</a>
      </tr>
    </td>
  </main>
</template>

<style scoped>
.title{
    text-align: left;
    color: var(--accent);
}
.text tr{
  text-align: center;
  margin-bottom: 1rem;
  color: var(--text-color, #333);
}
</style>
