import Knex from "knex";

export async function up(knex: Knex) {
    // CRIAR A TABELA
    return knex.schema.createTable('client_items', table => {
        table.increments('id').primary();

        table.integer('client_id')
        .notNullable()
        .references('id')
        .inTable('clients');

        table.integer('item_id')
        .notNullable()
        .references('id')
        .inTable('items');     
    });
}

export async function down(knex: Knex) {
    // VOLTAR ATRAS(DELETAR A TABELA)
    return knex.schema.dropTable('client_items');
}