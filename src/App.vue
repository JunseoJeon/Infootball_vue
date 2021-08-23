<template>
  <div>
    <Header/>
      <router-view/>
    <footer></footer>
  </div>
</template>

<script>
import Header from './views/Header.vue'
export default {
  components : {
     Header,
    }
}
</script>

<style>
@import './assets/styles/style.css';
@import './assets/styles/fixture.css';
@import './assets/styles/player.css';
@import './assets/styles/fixtures.css';
</style>