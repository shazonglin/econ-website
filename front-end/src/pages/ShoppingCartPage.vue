<template>
  <div>
    <h1>Shopping Cart</h1>
    <div v-if="cartItems.length > 0">
      <CartList @updateCart="updateCart" :products="cartItems" />
    </div>
    <div v-if="cartItems.length === 0">
      You current have no items in your cart!
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import CartList from '@/components/CartList.vue';

export default {
  name: 'ShoppingCartPage',
  components: { CartList },
  props: ['user'],
  watch: {
    async user(newUserVal) {
      if (newUserVal) {
        console.log(newUserVal, 'newUserVal');
        const cartResponse = await axios.get(
          `/api/users/${newUserVal.uid}/cart`
        );
        this.cartItems = cartResponse.data;
      }
    },
  },
  data() {
    return {
      cartItems: [],
    };
  },
  async created() {
    if (this.user) {
      const response = await axios.get(`api/users/${this.user.uid}/cart`);
      const cartItems = response.data;
      this.cartItems = cartItems;
    }
  },

  methods: {
    async updateCart(productId) {
      const response = await axios.delete(
        `/api/users/${this.user.uid}/cart/${productId}`
      );
      const cartItems = response.data;
      this.cartItems = cartItems;
    },
  },
};
</script>
