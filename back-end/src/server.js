import {
  products as productsRaw,
  cartItems as cartItemsRaw,
} from './temp-data';
const { MongoClient, ServerApiVersion } = require('mongodb');

const express = require('express');
const app = express();
// parse the request body
app.use(express.json());

let products = productsRaw;
let cartItems = cartItemsRaw;

/**
 * get products list
 */
app.get('/products', (req, res) => {
  res.json(products);
});

/**
 * helper function to get/post cart items
 */

function getCartDetail(ids) {
  return ids.map(id => products.find(product => product.id === id));
}
/**
 * get cart items list
 */
app.get('/cart', (req, res) => {
  const cartDetail = getCartDetail(cartItems);

  res.json(cartDetail);
});

/**
 * add item to the cart
 */
app.post('/cart', (req, res) => {
  // finding the product using id
  const productId = req.body.id;
  // add into the cart
  cartItems.push(productId);
  const cartDetail = getCartDetail(cartItems);
  res.json(cartDetail);
});

/**
 * delete item from the cart using url parameters.
 */
app.delete('/cart/:productId', (req, res) => {
  // finding the product using id
  const productId = req.params.productId;
  // delete it from the cart
  cartItems = cartItems.filter(id => id != productId);
  const cartDetail = getCartDetail(cartItems);
  res.json(cartDetail);
});

/**
 * delete item from the cart using body parameters.
 */
app.delete('/cart', (req, res) => {
  // finding the product using id
  const productId = req.body.id;
  // delete it from the cart
  cartItems = cartItems.filter(id => id != productId);
  const cartDetail = getCartDetail(cartItems);
  res.json(cartDetail);
});

/**
 * get product detail
 */
app.get('/products/:productId', (req, res) => {
  const productId = req.params.productId;
  const product = products.find(product => product.id === productId);
  res.json(product);
});

app.listen(8000, () => {
  console.log('Server is listening on port 8000');
});
