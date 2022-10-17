import { MongoClient, Db, Document } from 'mongodb';
import { CATEGORIES } from './collections';
import { categorySchema } from './schemas';

const cloudServer = process.env.APP_ENV !== 'production' ? '' : '+srv';
const user = encodeURIComponent(process.env.DANIK_MONGO_USERNAME || '');
const password = encodeURIComponent(process.env.DANIK_MONGO_PASSWORD || '');
const cluster = process.env.DANIK_MONGO_CLUSTER;
const uri = `mongodb${cloudServer}://${user}:${password}@${cluster}/?retryWrites=true&w=majority`;

const databaseName = process.env.DANIK_MONGO_DB_NAME;
let client: MongoClient;
export let database: Db;

const createSchemaSetter =
  (existingCollectionNames: string[]) => async (collectionName: string, validator: Document) => {
    if (existingCollectionNames.includes(collectionName)) {
      await database.command({ collMod: collectionName, validator });
    } else {
      await database.createCollection(collectionName, { validator });
    }
  };

export const init = async () => {
  if (!uri) {
    throw new Error('MONGO_URI is not defined in the environment!');
  }
  if (!databaseName) {
    throw new Error('MONGO_DB_NAME is not defined in the environment!');
  }
  client = new MongoClient(uri);

  await client.connect();
  database = client.db(databaseName);

  const collections = await database.collections();
  const existingCollectionNames = collections.map((c) => c.collectionName);
  const setupSchema = createSchemaSetter(existingCollectionNames);

  setupSchema(CATEGORIES, categorySchema);
};

export const close = () => {
  client.close();
};
