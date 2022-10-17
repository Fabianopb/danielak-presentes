import { Router } from 'express';
import { database } from './database';
import { CATEGORIES } from './collections';

const categoriesRouter = Router();

categoriesRouter.get('/badges', async (_, res, next) => {
  try {
    const collection = database.collection(CATEGORIES);
    const cursor = collection.find();
    const badges = await cursor.toArray();
    return res.status(200).json(badges);
  } catch (error) {
    next(error);
  }
});

export default categoriesRouter;
