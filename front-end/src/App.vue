<template>
  <div>
    <NavBar :user="user" />
    <div class="page-wrap">
      <router-view :user="user"></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
export default {
  name: 'App',
  components: { NavBar },
  data() {
    return {
      user: null,
    };
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      this.user = user;
      // console.log(this.user.uid, 'uid');
    });
  },
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
