import { Request, Response } from 'express';
import Knex from '../database/connection';

class ClientsController {
    async index(req: Request, res: Response) {
        const { city, uf, items } = req.query;

        const parsedItems = String(items)
        .split(',')
        .map(item => Number(item.trim()));

        const clients = await Knex('clients')
        .join('client_items', 'clients.id', '=', 'client_items.client_id')
        .whereIn('client_items.item_id', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('clients.*');

        return res.json(clients);
    }
    
    async show(req: Request, res: Response) {
        const { id } = req.params;

        const client = await Knex('clients').where('id', id).first();

        if(!client) {
            return res.status(400).json({message: 'Client not found!'})
        }

        /*
            SELECT * FROM items
            JOIN point_items ON items.id = point_items.item_id
            WHERE point_items.point_id = id
        */

        const items = await Knex('items')
        .join('client_items', 'items.id', '=', 'client_items.item_id')
        .where('client_items.client_id', id)
        .select('items.title', 'items.preco');

        return res.json({client, items});
    }

    async create(req: Request, res: Response) {
        const {
            name,
            email,
            whatsapp,
            address,
            city,
            uf,
            items
        } = req.body;

        const trx = await Knex.transaction();

        const client = {
            name,
            email,
            whatsapp,
            address,
            city,
            uf
        }

        const insertedids = await trx('clients').insert(client);

        const client_id = insertedids[0];

        const clientItems = items.map((item_id: number) => {
            return {
                item_id,
                client_id
            };
        });

        await trx('client_items').insert(clientItems);

        await trx.commit();

        return res.json({
            id: client_id,
            ...client,
        });
    }
}

export default ClientsController;