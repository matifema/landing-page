<template>
  <main>
    <h1 class="accent title">my links 🌐</h1>
    <p class="text">
      a collection of links i found around the web: <br>
      from articles, websites and repos to absolute bullshit. <br>have fun!
    </p>
    <br>
    <hr style="border-color: var(--color-background);">
    <br>
    <div class="linkslist">
      <div class="card text">
        <a href="https://github.com/upscayl/upscayl">
          Upscayl</a> 
          Image scaling with stable diffusion.
      </div>
      <div class="card text">
        <a href="https://github.com/EFForg/crocodilehunter">
          Crocodilehunter</a> 
          A tool to hunt stingrays by EFF. No, not the animal..
      </div>
      <div class="card text">
        <a href="https://github.com/ParrotSec/mimikatz">
          mimikatz</a> 
          oh oh bye bye Windows.
      </div>
      <div class="card text">
        <a href="https://github.com/jjjake/internetarchive">
          internetarchive's repo</a> 
          Useful to get large amounts of data, wink wink.
      </div>
      <div class="card text">
        <a href="https://www.tldraw.com/">
          tldraw</a> 
          Paint but better.
      </div>
      <div class="card text">
        <a href="https://blog.apaonline.org/2023/12/14/the-multiverse-and-anthropic-principle-are-not-enough/?amp">
          The Multiverse [..] is not enough</a> 
          Article on the existence of the multiverse by Timothy Andersen. 
      </div>
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
  </main>
</template>
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