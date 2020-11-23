import Knex from "knex";

export async function up(knex: Knex) {
    // CRIAR A TABELA
    return knex.schema.createTable('users_clients', table => {
        table.increments('id').primary();

        table.integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users');

        table.integer('client_id')
        .notNullable()
        .references('id')
        .inTable('clients');     
    });
}

export async function down(knex: Knex) {
    // VOLTAR ATRAS(DELETAR A TABELA)
    return knex.schema.dropTable('users_clients');
}