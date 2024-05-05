<template>
  <h1>Shopping Cart</h1>
  <div v-if="cartItems.length > 0">
    <CartList :products="cartItems" />
  </div>
  <div v-if="cartItems.length === 0">
    You current have no items in your cart!
  </div>
</template>

<script>
import CartList from '@/components/CartList.vue';
import { cartItems } from '@/temp-data';

export default {
  name: 'ShoppingCartPage',
  components: { CartList },
  data() {
    return {
      cartItems,
    };
  },
};
</script>
