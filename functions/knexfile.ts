import PostgresConnection from './shared-lib/helpers/postgres-connection';

module.exports = {
  development: PostgresConnection.getKnexConfig('./db/migrations'),
  production: PostgresConnection.getKnexConfig('./db/migrations'),
};
