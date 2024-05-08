import { createApp } from 'vue';
import App from './App.vue';
// import './main.css';
import * as VueRouter from 'vue-router';
import ShoppingCartPage from './pages/ShoppingCartPage.vue';
import ProductsPage from './pages/ProductsPage.vue';
import ProductDetailPage from './pages/ProductDetailPage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBtX6c3HZShY42YflKFY3JXiS5DCokvbFw',
  authDomain: 'vue-project-920f9.firebaseapp.com',
  projectId: 'vue-project-920f9',
  storageBucket: 'vue-project-920f9.appspot.com',
  messagingSenderId: '647400600187',
  appId: '1:647400600187:web:792d5a0250005d9f01e8de',
};

// Initialize Firebase
initializeApp(firebaseConfig);

createApp(App)
  .use(
    VueRouter.createRouter({
      history: VueRouter.createWebHistory(process.env.BASE_URL),
      routes: [
        {
          path: '/cart',
          component: ShoppingCartPage,
        },
        {
          path: '/products',
          component: ProductsPage,
        },
        {
          path: '/products/:productId',
          component: ProductDetailPage,
        },
        {
          path: '/:pathMatch(.*)*',
          component: NotFoundPage,
        },
        {
          path: '/',
          redirect: 'products',
        },
      ],
    })
  )
  .mount('#app');
