<template>
  <div class="nav-bar">
    <div class="logo-wrap">
      <router-link to="/products" class="products-link">
        <img :src="logo" alt="logo" />
      </router-link>
    </div>
    <div class="nav-buttons-wrap">
      <button class="sign-out-btn" @click="logOut" v-if="user">Sign Out</button>
      <router-link to="/cart">
        <button>Shopping Cart</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { getAuth, signOut } from 'firebase/auth';
import logo from '@/assets/logo-shoe.png';
export default {
  name: 'NavBar',
  props: ['user'],
  data() {
    return {
      logo,
    };
  },
  methods: {
    logOut() {
      const auth = getAuth();
      signOut(auth);
      alert('You have logged out!');
    },
  },
};
</script>

<style>
.nav-bar {
  border-bottom: 1px solid #ddd;
  height: 75px;
  width: 100%;
}

.logo-wrap {
  width: 120px;
  height: 120px;
}
.logo-wrap img {
  width: 120px;
  height: 120px;
}
.cart-link {
  position: absolute;
  right: 16px;
  top: 16px;
}
.sign-out-btn {
  margin-right: 20px;
}
.nav-buttons-wrap {
  position: absolute;
  right: 16px;
  top: 16px;
}
</style>
