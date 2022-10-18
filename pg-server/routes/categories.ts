import { Router } from 'express';
import { database } from '../database';
import { CATEGORIES } from '../collections';

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

export default categoriesRouter;
