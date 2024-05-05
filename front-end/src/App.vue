<template>
  <NavBar />
  <div class="page-wrap">
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
export default {
  name: 'App',
  components: { NavBar },
};
</script>

<style>
* {
  box-sizing: border-box;
  font-family: Arial;
}

button {
  background-color: black;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  outline: 0;
  padding: 16px;
}

h1 {
  border-bottom: 1px solid black;
  margin: 0;
  margin-top: 16px;
  padding: 16px;
}
.page-wrap {
  margin: auto;
  max-width: 800px;
  min-height: 100vh;
}
</style>
