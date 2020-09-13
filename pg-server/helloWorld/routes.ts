import { Router } from 'express';
import { selectAllExamples } from './handlers';

const router = Router();

router.get('/examples', async (req, res) => {
  const examples = await selectAllExamples();
  return res.json(examples);
});

export default router;
