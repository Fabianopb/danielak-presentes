import { getDb } from '../config';
import { Message, MessagePayload } from './types';

const table = 'messages';

export const selectAllMessages = async () => {
  const db = getDb();
  return db<Message>(table).select();
};

export const insertMessage = async (payload: MessagePayload) => {
  const db = getDb();
  return db<Message>(table).insert(payload).returning('id').first();
};

export const updateMessage = async (id: string, payload: MessagePayload) => {
  const db = getDb();
  await db<Message>(table).where('id', id).update(payload);
};

export const deleteMessage = async (id: string) => {
  const db = getDb();
  await db<Message>(table).where('id', id).delete();
};

export const toggleMessageAnswered = async (id: string) => {
  const db = getDb();
  const isAnswered = await db<Message>(table).where({ id }).returning('isAnswered').first();
  return db<Message>(table).where({ id }).update('isAnswered', !isAnswered).returning('*').first();
};
