<template>
  <div v-if="product">
    <div class="img-wrap">
      <img :src="product.imageUrl" alt="prodcut image" />
    </div>
    <div class="product-details">
      <h1>{{ product.name }}</h1>
      <h3 class="price">{{ product.price }}</h3>
      <button
        class="add-to-cart"
        @click="addProduct"
        v-if="user && !itemInCart"
      >
        Add to cart
      </button>
      <button class="grey-button" v-if="user && itemInCart">
        Item is alreay in the cart!
      </button>
      <button class="sign-in" @click="signIn" v-if="!user">
        Sign in to add to cart
      </button>
    </div>
  </div>
  <div v-else>
    <NotFoundPageVue />
  </div>
</template>

<script>
import axios from 'axios';
import {
  getAuth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from 'firebase/auth';
import NotFoundPageVue from './NotFoundPage.vue';

export default {
  name: 'ProductDetailPage',
  components: { NotFoundPageVue },
  props: ['user'],
  data() {
    return {
      product: {},
      cartItems: [],
    };
  },
  async created() {
    // check if user is signed in with email link
    const auth = getAuth();
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const email = window.localStorage.getItem('emailForSignIn');
      await signInWithEmailLink(auth, email, window.location.href);
      alert('Successfully signed in!');
      window.localStorage.removeItem('emailForSignIn');
    }

    const response = await axios.get(
      `/api/products/${this.$route.params.productId}`
    );
    this.product = response.data;

    if (this.user) {
      const cartResponse = await axios.get(`/api/users/${this.user.uid}/cart`);
      this.cartItems = cartResponse.data;
    }
  },
  computed: {
    itemInCart() {
      return this.cartItems.some(
        item => item.id === this.$route.params.productId
      );
    },
  },
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
  methods: {
    async addProduct() {
      let params = {
        id: this.$route.params.productId,
      };
      await axios.post(`/api/users/${this.user.uid}/cart`, params);
      alert('Successfully Added');
    },

    /**
     * Sign in function
     */

    async signIn() {
      const email = prompt('Please enter your email to sign in!');
      const auth = getAuth();
      // const baseUrl = window.location.origin; // current address and ports
      const actionCodeSettings = {
        url: `https://econ-website-full-stack.onrender.com/products/${this.$route.params.productId}`,
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      alert('Login link was sent to your email!');
      window.localStorage.setItem('emailForSignIn', email);
    },
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

.grey-button {
  background-color: #888;
  width: 100%;
}

.sign-in {
  width: 100%;
  margin-top: 16px;
}
</style>
