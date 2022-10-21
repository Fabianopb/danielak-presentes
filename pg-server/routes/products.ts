import { Router } from 'express';
import { database } from '../database';
import { PRODUCTS } from '../collections';
import auth from '../auth';
import { NotFoundError } from '../utils';
import { ObjectId } from 'mongodb';

const productsRouter = Router();

productsRouter.get('/products', async (_, res, next) => {
  try {
    const collection = database.collection(PRODUCTS);
    const cursor = collection.find();
    const products = await cursor.toArray();
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

productsRouter.get('/products/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params;
    const collection = database.collection(PRODUCTS);
    const product = await collection.findOne({ _id: new ObjectId(productId) });
    if (!product) {
      throw new NotFoundError(`Product '${productId}' not found`);
    }
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

productsRouter.post('/products', auth, async (req, res, next) => {
  try {
    const collection = database.collection(PRODUCTS);
    const product = { ...req.body, createdAt: new Date().toISOString() };
    await collection.insertOne(product);
    return res.status(200).json({ message: 'Product created' });
  } catch (error) {
    next(error);
  }
});

productsRouter.put('/products/:productId', auth, async (req, res, next) => {
  try {
    const { productId } = req.params;
    const updateDocument = req.body;
    const collection = database.collection(PRODUCTS);
    const result = await collection.updateOne(
      { _id: new ObjectId(productId) },
      { $set: updateDocument },
      { upsert: false }
    );
    if (result.matchedCount === 0) {
      throw new NotFoundError(`Product '${productId}' not found`);
    }
    return res.status(200).json({ message: 'Product updated' });
  } catch (error) {
    next(error);
  }
});

productsRouter.delete('/products/:productId', auth, async (req, res, next) => {
  try {
    const { productId } = req.params;
    const collection = database.collection(PRODUCTS);
    const result = await collection.deleteOne({ _id: new ObjectId(productId) });
    if (result.deletedCount === 0) {
      throw new NotFoundError(`Product '${productId}' not found`);
    }
    return res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    next(error);
  }
});

export default productsRouter;
