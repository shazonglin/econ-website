import path from 'path';
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');

async function serve() {
  const url = process.env.MONGODB_URI;
  const client = new MongoClient(url);

  const app = express();
  app.use(cors());
  // parse the request body
  app.use(express.json());
  // imgae path on serve side
  app.use('/images', express.static(path.join(__dirname, '../assets')));
  app.use(
    express.static(path.resolve(__dirname, '../dist'), {
      maxAge: '1y',
      etag: false,
    })
  );

  // connect database
  await client.connect();
  // use database
  const db = client.db('econ-db');

  /**
   * get products list
   */
  app.get('/api/products', async (req, res) => {
    // get the collection
    const products = await db.collection('products').find({}).toArray();
    res.send(products);
  });

  /**
   * helper function to get/post cart items
   */

  async function getCartDetail(ids) {
    return Promise.all(
      ids.map(id => db.collection('products').findOne({ id }))
    );
  }
  /**
   * get cart items list
   */
  app.get('/api/users/:userId/cart', async (req, res) => {
    const users = await db
      .collection('users')
      .findOne({ id: req.params.userId });
    // if (!users) {
    //   users = await db.collection('users').insertOne({
    //     id: req.params.userId,
    //     cartItems: [],
    //   });
    // }

    const cartDetail = await getCartDetail(users?.cartItems || []);
    res.json(cartDetail);
  });

  /**
   * add item to the cart
   */
  app.post('/api/users/:userId/cart', async (req, res) => {
    // finding the product using id
    const productId = req.body.id;
    const userId = req.params.userId;

    // check if the user is in the databse

    const existingUser = await db.collection('users').findOne({ id: userId });

    // add if there is no record of this user
    if (!existingUser) {
      await db.collection('users').insertOne({ id: userId, cartItems: [] });
    }

    // add into the cart
    await db.collection('users').updateOne(
      { id: userId },
      {
        $addToSet: { cartItems: productId },
      }
    );

    // return usres cartItems
    const users = await db
      .collection('users')
      .findOne({ id: req.params.userId });
    const cartDetail = await getCartDetail(users?.cartItems || []);
    res.json(cartDetail);
  });

  /**
   * delete item from the cart using url parameters.
   */
  app.delete('/api/users/:userId/cart/:productId', async (req, res) => {
    // finding the product using id
    const productId = req.params.productId;

    // delete it from the cart
    await db.collection('users').updateOne(
      { id: req.params.userId },
      {
        $pull: { cartItems: productId },
      }
    );

    // find userId
    const users = await db
      .collection('users')
      .findOne({ id: req.params.userId });
    console.log(req.params.userId, users, 'userssssssss');
    const cartDetail = await getCartDetail(users?.cartItems || []);
    res.json(cartDetail);
  });

  /**
   * delete item from the cart using body parameters.
   */
  app.delete('/api/users/:userId/cart', async (req, res) => {
    // finding the product using id
    const productId = req.body.id;
    // delete it from the cart
    await db.collection('users').updateOne(
      { id: req.params.userId },
      {
        $pull: { cartItems: productId },
      }
    );

    // find userId
    const users = await db
      .collection('users')
      .findOne({ id: req.params.userId });
    const cartDetail = await getCartDetail(users?.cartItems || []);
    res.json(cartDetail);
  });

  /**
   * get product detail
   */
  app.get('/api/products/:productId', async (req, res) => {
    const product = await db
      .collection('products')
      .findOne({ id: req.params.productId });
    // const productId = req.params.productId;
    // const product = products.find(product => product.id === productId);
    res.json(product);
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });

  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log('Server is listening on port' + port);
  });
}

serve();
