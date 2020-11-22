import Knex from 'knex';

export async function seed(knex: Knex) {
        await knex('items').insert([
            { title: 'Site', preco: 'R$400' },
            { title: 'Anúncios', preco: 'R$100' },
            { title: 'Gestão de Redes Sociais', preco: 'R$400' },
            { title: 'Canais de vendas', preco: 'R$100' },
        ]);
}