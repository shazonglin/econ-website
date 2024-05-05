<template>
  <div v-if="product">
    <div class="img-wrap">
      <img :src="product.imageName" alt="prodcut image" />
    </div>
    <div class="product-details">
      <h1>{{ product.name }}</h1>
      <h3 class="price">{{ product.price }}</h3>
      <button class="add-to-cart">Add to cart</button>
    </div>
  </div>
  <div v-else>
    <NotFoundPageVue />
  </div>
</template>

<script>
import { products } from '@/temp-data';
import NotFoundPageVue from './NotFoundPage.vue';

export default {
  name: 'ProductDetailPage',
  components: { NotFoundPageVue },
  data() {
    return {
      product: products.find(
        product => product.id === this.$route.params.productId
      ),
    };
  },
};
</script>

<style>
.img-wrap {
  margin-top: 32px;
  text-align: center;
}
.img-wrap img {
  width: 400px;
}
.product-details {
  padding: 16px;
  position: relative;
}
.price {
  position: absolute;
  top: 24px;
  right: 16px;
}
.add-to-cart {
  width: 100%;
  margin-top: 16px;
}
</style>
