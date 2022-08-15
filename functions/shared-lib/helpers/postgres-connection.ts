import { knex, Knex } from 'knex';
import env from './env-helper';

export default class PostgresConnection {
  private static knex?: Knex;
  public static Knex(): Knex {
    if (this.knex) {
      return this.knex;
    } else {
      this.knex = knex(this.getKnexConfig());
      return this.knex;
    }
  }

  public static getKnexConfig(migrationsDirectory?: string): Knex.Config {
    const config: Knex.Config = {
      client: 'pg',
      debug: env.tryGetValue('PG_DEBUG'),
      connection: {
        host: env.tryGetValue('PG_HOST'),
        user: env.tryGetValue('PG_USER'),
        password: env.tryGetValue('PG_PASSWORD'),
        database: env.tryGetValue('PG_DATABASE'),
        multipleStatements: true,
      },
      pool: {
        min: env.tryGetValue('PG_MIN_POOL'),
        max: 10,
      },
    };

    if (migrationsDirectory) {
      config['migrations'] = {
        directory: migrationsDirectory,
      };
    }

    return config;
  }
}
