import { Router } from 'express';
import bodyParser from 'body-parser';
import authorize from '../auth/authorize';
import {
  selectAllMessages,
  insertMessage,
  updateMessage,
  deleteMessage,
  toggleMessageAnswered,
} from './handlers';

const router = Router();

router.get('/messages', async (req, res) => {
  const messages = await selectAllMessages();
  return res.status(200).json(messages);
});

router.post('/messages', bodyParser.json(), async (req, res) => {
  const newMessageId = await insertMessage(req.body);
  if (newMessageId) {
    return res.status(200).json({ id: newMessageId });
  }
});

router.put('/messages/:id', bodyParser.json(), async (req, res) => {
  await updateMessage(req.params.id, req.body);
  return res.status(200).json({ message: 'Message updated' });
});

router.delete('/messages/:id', authorize, async (req, res) => {
  await deleteMessage(req.params.id);
  return res.status(200).json({ message: 'Message removed' });
});

router.put('/answer/:id', bodyParser.json(), async (req, res) => {
  const message = await toggleMessageAnswered(req.params.id);
  return res.status(200).json({ message });
});

export default router;
