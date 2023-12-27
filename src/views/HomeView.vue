<template>
  <div class="homepage">

    <h1 class="accent title">My links</h1>
    <p class="text">
      This is a collection of links i found around the internet,
      from useful articles, websites and repos to absolute bullishit. Have fun!
    </p>
    <br>
    <hr>
    <br>
    <div class="linkslist">
      <div class="card text">
        <a href="https://portableapps.com/apps">Portable Apps</a>
        A website filled with portable .exe apps. No installation needed, just download and run
      </div>
      <div class="card text">
        <a href="https://12ft.io/">12ft Ladder</a>
        Removes ads, popups and banners from most paid-content websites
      </div>
      <div class="card text">
        <a href="https://squoosh.app/">Squoosh</a>
        Compress images with almost no quality loss. Nice UI
      </div>
      <div class="card text">
        <a href="https://www.2600.com/">2600</a>
        The Hacker Quarterly
      </div>
      <div class="card text">
        <a href="https://tempmail.net/">tempMail</a>
        Dont give out your email dude use temporary emails
      </div>
      <div class="card text">
        <a href="https://quackr.io/temporary-numbers">tempNumber</a>
        Temporary numbers from all over the globe
      </div>
    </div>
  </div>
</template>

<style scoped>
a {
  color: var(--accent);
}
.homepage {
  margin-top: 30px;
  max-width: 70%;
}
.linkslist {
  overflow: visible;
  height: 100vh;
}
@media(min-width: 800px) {
  .homepage {
    max-width: 50%;
  }
  .linkslist {
    overflow: scroll;
    height: 400px;
  }
}
</style>