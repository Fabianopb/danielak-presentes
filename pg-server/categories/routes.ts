import { Router } from 'express';
import bodyParser from 'body-parser';
import authorize from '../auth/authorize';
import {
  selectAllCategories,
  insertCategory,
  updateCategory,
  deleteCategory,
  selectCategoryById,
} from './handlers';

const router = Router();

router.get('/categories', async (req, res) => {
  const categories = await selectAllCategories();
  return res.status(200).json(categories);
});

router.get('/categories/:id', async (req, res) => {
  const category = await selectCategoryById(req.params.id);
  return res.status(200).json(category);
});

router.post('/categories', authorize, bodyParser.json(), async (req, res) => {
  await insertCategory(req.body);
  return res.status(200).json({ message: 'Category inserted' });
});

router.put('/categories/:id', authorize, bodyParser.json(), async (req, res) => {
  await updateCategory(req.params.id, req.body);
  return res.status(200).json({ message: 'Category updated' });
});

router.delete('/categories/:id', authorize, async (req, res) => {
  await deleteCategory(req.params.id);
  return res.status(200).json({ message: 'Category deleted' });
});

export default router;
