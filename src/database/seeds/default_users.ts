import Knex from 'knex';

export async function seed(knex: Knex) {
        await knex('users').insert(
          {
            name: "Andre",
            email: "andrebmx789@gmail.com",
            password_hash: "312978"
          }
        );
}