import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('Users', (table) => {
      table.uuid('userId').notNullable().primary().unique();
      table.timestamp('createdOn', { useTz: true });
      table.timestamp('updatedOn', { useTz: true });
    })
    .createTable('ServiceProviders', (table) => {
      table.uuid('serviceProviderId').notNullable().unique().primary();
      table.string('serviceProviderName', 200).notNullable();
      table.uuid('createdBy').notNullable();
      table.foreign('createdBy').references('userId').inTable('Users').onUpdate('RESTRICT').onDelete('RESTRICT');
      table.timestamp('createdOn', { useTz: true });
      table.timestamp('updatedOn', { useTz: true });
    })
    .createTable('SupportWorkers', (table) => {
      table.uuid('supportWorkerId').primary().unique().notNullable();
      table.uuid('userId').notNullable();
      table.foreign('userId').references('userId').inTable('Users').onDelete('RESTRICT').onUpdate('RESTRICT');
      table.uuid('serviceProviderId').notNullable();
      table
        .foreign('serviceProviderId')
        .references('serviceProviderId')
        .inTable('ServiceProviders')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT');
      table.unique(['userId', 'serviceProviderId']);
      table.timestamp('joiningDate', { useTz: true }).notNullable();
      table.timestamp('updatedOn', { useTz: true });
      table.timestamp('createdOn', { useTz: true });
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('SupportWorkers').dropTable('ServiceProviders').dropTable('Users');
}
