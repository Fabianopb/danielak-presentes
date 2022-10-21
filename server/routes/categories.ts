import { Router } from 'express';
import { database } from '../database';
import { CATEGORIES } from '../collections';
import auth from '../auth';
import { NotFoundError } from '../utils';
import { ObjectId } from 'mongodb';

const categoriesRouter = Router();

categoriesRouter.get('/categories', async (_, res, next) => {
  try {
    const collection = database.collection(CATEGORIES);
    const cursor = collection.find();
    const categories = await cursor.toArray();
    return res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
});

categoriesRouter.get('/categories/:categoryId', async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const collection = database.collection(CATEGORIES);
    const category = await collection.findOne({ _id: new ObjectId(categoryId) });
    if (!category) {
      throw new NotFoundError(`Category '${categoryId}' not found`);
    }
    return res.status(200).json(category);
  } catch (error) {
    next(error);
  }
});

categoriesRouter.post('/categories', auth, async (req, res, next) => {
  try {
    const collection = database.collection(CATEGORIES);
    const category = { ...req.body, createdAt: new Date().toISOString() };
    await collection.insertOne(category);
    return res.status(200).json({ message: 'Category created' });
  } catch (error) {
    next(error);
  }
});

categoriesRouter.put('/categories/:categoryId', auth, async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const updateDocument = req.body;
    const collection = database.collection(CATEGORIES);
    const result = await collection.updateOne(
      { _id: new ObjectId(categoryId) },
      { $set: updateDocument },
      { upsert: false }
    );
    if (result.matchedCount === 0) {
      throw new NotFoundError(`Category '${categoryId}' not found`);
    }
    return res.status(200).json({ message: 'Category updated' });
  } catch (error) {
    next(error);
  }
});

categoriesRouter.delete('/categories/:categoryId', auth, async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const collection = database.collection(CATEGORIES);
    const result = await collection.deleteOne({ _id: new ObjectId(categoryId) });
    if (result.deletedCount === 0) {
      throw new NotFoundError(`Category '${categoryId}' not found`);
    }
    return res.status(200).json({ message: 'Category deleted' });
  } catch (error) {
    next(error);
  }
});

export default categoriesRouter;
