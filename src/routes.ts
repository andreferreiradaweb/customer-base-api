import express from 'express';
import ClientsController from './controllers/ClientsController';
import ItemsController from './controllers/ItemsController';
import UsersController from './controllers/UsersControler';
import SessionController from './controllers/SessionController';

import authMiddleware from './middlewares/auth'

// store, index, show, create, delete

const routes = express.Router()

const clientsController = new ClientsController();
const itemsController = new ItemsController();
const usersController = new UsersController();
const sessionController = new SessionController();



routes.post('/session', sessionController.store);


routes.post('/users', usersController.create);

routes.get('/items', itemsController.index);

// routes.use(authMiddleware);

routes.post('/clients', authMiddleware, clientsController.create);
routes.get('/clients', clientsController.index);
routes.get('/clients/:id', clientsController.show);

export default routes;