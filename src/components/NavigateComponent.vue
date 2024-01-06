<script setup>
import { ref } from 'vue'
import HelpComponent from './HelpComponent.vue';
import router from '@/router';

document.addEventListener('keydown', function(event) {
  if (event.ctrlKey && event.key === 's') {
    event.preventDefault();  // Prevents the default save dialog
    document.getElementById('inpt').focus();  // Focuses the input
  }
  if (event.key == 'Escape') {
    msg.value = ''
    helpModal.value = false
    router.push('/')
  }
});
const msg = ref('')
const helpModal = ref(false)
const routeNames = router.getRoutes().map(route => route.name);

function send(){
  if (msg.value == 'help' || msg.value == 'h'){
    helpModal.value = true
    document.getElementById('inpt').textContent = ''
    document.activeElement.blur()
  }
  if (msg.value == 'files'){
    window.location.href = "https://files.matifema.com"
  }
  if (msg.value == 'omv'){
    window.location.href = "https://omv.matifema.com"
  }
  if(routeNames.includes(msg.value)){
    router.push('/'+msg.value)
  }
  msg.value = ''
    
}

</script>

<template>
  <main>
    <div class="inputwrapper">
      > <input id="inpt" class="console" placeholder="type here.." @keyup.enter="send()" v-model="msg">
    </div>
    <Transition>
      <HelpComponent v-show="helpModal"></HelpComponent>
    </Transition>
  </main>
</template>

<style scoped>
.inputwrapper {
  justify-self: center;
  width: 70%;
  font-size: 1.2rem;
}
.console {
  width: 50%;
  border: none;
  background-color: var(--color-background-soft);
  outline: none;
  color: var(--color-text);
  font-size: 1.2rem;
}
@media (min-width: 800px) {
  .inputwrapper {
    font-size: 2.6rem;
  }
  .console {
    font-size: 2.6rem;
  }
}
</style>