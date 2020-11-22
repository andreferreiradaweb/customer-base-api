import { Request, Response } from 'express';
import Knex from '../database/connection';

class ItemsController {
    async index(req: Request, res: Response) {
        const items = await Knex('items').select('*');
       
        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                preco: item.preco,
            }
        })
    
        return res.json(serializedItems);
    }
}

export default ItemsController;