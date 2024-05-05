<template>
  <div class="nav-bar">
    <div class="logo-wrap">
      <router-link to="/products" class="products-link">
        <img :src="logo" alt="logo" />
      </router-link>
    </div>
    <router-link to="/cart" class="cart-link">
      <button>Shopping Cart</button>
    </router-link>
  </div>
</template>

<script>
import logo from '@/assets/logo-shoe.png';
export default {
  name: 'NavBar',
  data() {
    return {
      logo,
    };
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
</style>
