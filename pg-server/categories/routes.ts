import { Router } from 'express';
import bodyParser from 'body-parser';
import authorize from '../auth/authorize';
import { selectAllCategories, insertCategory, updateCategory, deleteCategory, selectCategoryById } from './handlers';
import { asyncHandler, NotFoundError } from '../utils';

const router = Router();

router.get(
  '/categories',
  asyncHandler(async (req, res) => {
    const categories = await selectAllCategories();
    return res.status(200).json(categories);
  })
);

router.get(
  '/categories/:id',
  asyncHandler(async (req, res) => {
    const category = await selectCategoryById(req.params.id);
    if (!category) {
      throw new NotFoundError(`Category with id '${req.params.id}' was not found!`);
    }
    return res.status(200).json(category);
  })
);

router.post(
  '/categories',
  authorize,
  bodyParser.json(),
  asyncHandler(async (req, res) => {
    await insertCategory(req.body);
    return res.status(200).json({ message: 'Category inserted' });
  })
);

router.put(
  '/categories/:id',
  authorize,
  bodyParser.json(),
  asyncHandler(async (req, res) => {
    await updateCategory(req.params.id, req.body);
    return res.status(200).json({ message: 'Category updated' });
  })
);

router.delete(
  '/categories/:id',
  authorize,
  asyncHandler(async (req, res) => {
    await deleteCategory(req.params.id);
    return res.status(200).json({ message: 'Category deleted' });
  })
);

export default router;
