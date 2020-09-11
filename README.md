New pg server

For development, start Postgres server:

```
pg_ctl -D /usr/local/var/postgres start
```

Create development db

```
yarn create:db:dev
```