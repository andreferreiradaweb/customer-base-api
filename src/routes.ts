import express from 'express';
import ClientsController from './controllers/ClientsController';
import ItemsController from './controllers/ItemsController';

// index, show, create, delete

const routes = express.Router()

const clientsController = new ClientsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);

routes.post('/clients', clientsController.create);
routes.get('/clients', clientsController.index);
routes.get('/clients/:id', clientsController.show);

export default routes;