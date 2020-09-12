import Knex from 'knex';

const knexConfig: Record<string, Knex.Config> = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: '',
      database: 'danik_dev',
    },
    migrations: {
      directory: './migrations',
    },
  },

  test: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: '',
      database: 'danik_test',
    },
    migrations: {
      directory: './migrations',
    },
  },

  production: {
    client: 'pg',
    connection: {
      host: process.env.POSTGRES_HOST,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      port: 5432,
    },
    migrations: {
      directory: './migrations',
    },
  },
};

export default knexConfig;
