import { Router } from 'express';
import { ObjectId } from 'mongodb';
import auth from '../auth';
import { MESSAGES } from '../collections';
import { database } from '../database';
import { NotFoundError } from '../utils';

const messagesRouter = Router();

messagesRouter.get('/messages', async (_, res, next) => {
  try {
    const collection = database.collection(MESSAGES);
    const cursor = collection.find();
    const messages = await cursor.toArray();
    return res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
});

messagesRouter.post('/messages', async (req, res, next) => {
  try {
    const collection = database.collection(MESSAGES);
    const message = { ...req.body, isNew: true, isAnswered: false, createdAt: new Date().toISOString() };
    const result = await collection.insertOne(message);
    return res.status(200).json({ id: result.insertedId, message: 'Message created' });
  } catch (error) {
    next(error);
  }
});

messagesRouter.put('/messages/:messageId', async (req, res, next) => {
  try {
    const { messageId } = req.params;
    const updateDocument = req.body;
    const collection = database.collection(MESSAGES);
    const result = await collection.updateOne(
      { _id: new ObjectId(messageId) },
      { $set: updateDocument },
      { upsert: false }
    );
    if (result.matchedCount === 0) {
      throw new NotFoundError(`Message '${messageId}' not found`);
    }
    return res.status(200).json({ message: 'Message updated' });
  } catch (error) {
    next(error);
  }
});

messagesRouter.put('/messages/:messageId/answer', auth, async (req, res, next) => {
  try {
    const { messageId } = req.params;
    const collection = database.collection(MESSAGES);
    const message = await collection.findOne({ _id: new ObjectId(messageId) });
    if (!message) {
      throw new NotFoundError(`Message '${messageId}' not found`);
    }
    const { _id, createdAt, ...rest } = message;
    const updateDocument = { ...rest, isAnswered: !rest.isAnswered };
    const result = await collection.updateOne(
      { _id: new ObjectId(messageId) },
      { $set: updateDocument },
      { upsert: false }
    );
    if (result.matchedCount === 0) {
      throw new NotFoundError(`Message '${messageId}' not found`);
    }
    return res.status(200).json({ message: 'Message updated' });
  } catch (error) {
    next(error);
  }
});

messagesRouter.delete('/messages/:messageId', auth, async (req, res, next) => {
  try {
    const { messageId } = req.params;
    const collection = database.collection(MESSAGES);
    const result = await collection.deleteOne({ _id: new ObjectId(messageId) });
    if (result.deletedCount === 0) {
      throw new NotFoundError(`Message '${messageId}' not found`);
    }
    return res.status(200).json({ message: 'Message deleted' });
  } catch (error) {
    next(error);
  }
});

export default messagesRouter;
