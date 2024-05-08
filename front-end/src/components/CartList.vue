<template>
  <div>
    <div
      class="product-container"
      v-for="product in products"
      :key="product.id"
    >
      <img class="product-image" :src="product.imageUrl" alt="product image" />
      <div class="details-wrap">
        <h3>{{ product.name }}</h3>
        <p>{{ product.price }}</p>
      </div>
      <button class="remove-button" @click="removeItem(product.id)">
        Remove from Cart
      </button>
    </div>
    <button class="checkout-button">Proceed to Checkout</button>
  </div>
</template>

<script>
// import axios from 'axios';
export default {
  name: 'CartList',
  props: ['products'],
  data() {
    return {
      cartItems: [],
    };
  },
  methods: {
    /**
     * Remove item from cart
     */
    removeItem(productId) {
      // console.log(productId, this.cartItems, 'before');
      // const response = await axios.delete(`/api/users/6666/cart/${productId}`);
      // const cartItems = response.data;
      // this.cartItems = cartItems;
      // console.log(productId, this.cartItems, 'after');

      // send it to parent component
      this.$emit('updateCart', productId);
    },
  },
};
</script>

<style>
.product-container {
  align-content: 'center';
  border-bottom: 1px solid #ddd;
  display: flex;
  padding: 16px;
  width: 100%;
}
.product-image {
  flex: 1;
  height: 100px;
  max-width: 100px;
}

.details-wrap {
  padding: 0 16px;
  flex: 3;
}
.remove-button {
  flex: 1;
  margin: auto;
}
.checkout-button {
  width: 100%;
}
</style>
