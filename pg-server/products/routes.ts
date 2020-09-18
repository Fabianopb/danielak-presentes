import { Router } from 'express';
import bodyParser from 'body-parser';
import authorize from '../auth/authorize';
import {
  selectAllProducts,
  insertProduct,
  updateProduct,
  deleteProduct,
  selectProductById,
} from './handlers';

const router = Router();

router.get('/products', async (req, res) => {
  const products = await selectAllProducts();
  return res.status(200).json(products);
});

router.get('/products/:id', async (req, res) => {
  const product = await selectProductById(req.params.id);
  return res.status(200).json(product);
});

router.post('/products', authorize, bodyParser.json(), async (req, res) => {
  await insertProduct(req.body);
  return res.status(200).json({ message: 'New product saved!' });
});

router.put('/products/:id', authorize, bodyParser.json(), async (req, res) => {
  await updateProduct(req.params.id, req.body);
  return res.status(200).json({ message: 'Product updated' });
});

router.delete('/products/:id', authorize, async (req, res) => {
  await deleteProduct(req.params.id);
  return res.status(200).json({ message: 'Product removed' });
});

export default router;
