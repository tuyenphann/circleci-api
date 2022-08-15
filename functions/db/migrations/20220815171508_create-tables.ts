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
    .createTable('SupportWorkers', (tableBuilder) => {
      tableBuilder.uuid('supportWorkerId').primary().unique().notNullable();
      tableBuilder.uuid('userId').notNullable();
      tableBuilder.foreign('userId').references('userId').inTable('Users').onDelete('RESTRICT').onUpdate('RESTRICT');
      tableBuilder.uuid('serviceProviderId').notNullable();
      tableBuilder
        .foreign('serviceProviderId')
        .references('serviceProviderId')
        .inTable('ServiceProviders')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT');
      tableBuilder.unique(['userId', 'serviceProviderId']);
      tableBuilder.timestamp('joiningDate', { useTz: true }).notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('SupportWorkers').dropTable('ServiceProviders').dropTable('Users');
}
