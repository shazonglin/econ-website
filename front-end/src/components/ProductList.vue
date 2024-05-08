<template>
  <div class="grid-wrap">
    <div class="product-item" v-for="product in products" :key="product.id">
      <router-link :to="'/products/' + product.id">
        <img :src="product.imageUrl" />
      </router-link>
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-price">{{ product.price }}</p>
      <router-link :to="'/products/' + product.id">
        <button>View Details</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  props: ['products'],
  data() {
    return {};
  },
};
</script>

<style>
.grid-wrap {
  display: flex;
  justify-content: flex-start;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 16px;
}
.product-item {
  align-items: center;
  border-radius: 8px;
  box-shadow: 0px 2px 5px #888;
  display: flex;
  flex-direction: column;
  margin-bottom: 2%;
  padding: 20px;
  position: relative;
  width: 32%;
}
.product-name {
  margin-bottom: 0;
}

.product-item img {
  height: 200px;
  width: 200px;
}

.product-item a {
  width: 100%;
}

.product-item button {
  width: 100%;
}

.product-image {
  flex: 1;
  height: 100px;
  max-width: 100px;
}
</style>
