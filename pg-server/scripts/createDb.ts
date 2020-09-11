import Knex from 'knex';
import knexfile from '../knexfile';

(async () => {
  const config = knexfile.development;
  const devDbName = config.connection.database;
  const knex = Knex({ ...config, connection: { ...config.connection, database: undefined } });

  await knex.raw(`CREATE DATABASE ${devDbName}`);
  await knex.destroy();
})();
