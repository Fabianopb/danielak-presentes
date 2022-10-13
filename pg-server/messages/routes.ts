import { Router } from 'express';
import bodyParser from 'body-parser';
import authorize from '../auth/authorize';
import { selectAllMessages, insertMessage, updateMessage, deleteMessage, toggleMessageAnswered } from './handlers';
import { asyncHandler } from '../utils';

const router = Router();

router.get(
  '/messages',
  asyncHandler(async (req, res) => {
    const messages = await selectAllMessages();
    return res.status(200).json(messages);
  })
);

router.post(
  '/messages',
  bodyParser.json(),
  asyncHandler(async (req, res) => {
    const newMessageId = await insertMessage(req.body);
    return res.status(200).json({ id: newMessageId });
  })
);

router.put(
  '/messages/:id',
  bodyParser.json(),
  asyncHandler(async (req, res) => {
    await updateMessage(req.params.id, req.body);
    return res.status(200).json({ message: 'Message updated' });
  })
);

router.delete(
  '/messages/:id',
  authorize,
  asyncHandler(async (req, res) => {
    await deleteMessage(req.params.id);
    return res.status(200).json({ message: 'Message removed' });
  })
);

router.put(
  '/messages/:id/answer',
  bodyParser.json(),
  asyncHandler(async (req, res) => {
    const message = await toggleMessageAnswered(req.params.id);
    return res.status(200).json({ message });
  })
);

export default router;
