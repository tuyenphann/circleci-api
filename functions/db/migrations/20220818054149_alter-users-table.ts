import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('Users', (table) => {
    table.timestamp('firstName');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('Users', (table) => {
    table.dropColumn('firstName');
  });
}
