import { Request, Response } from 'express';
import Knex from '../database/connection';
import Bcrypt from 'bcrypt'

class UsersController {

  async create(req: Request, res: Response) {
    const {
      name,
      email,
      password
    } = req.body;

    const password_hash = await Bcrypt.hash(password, 10)
      .then(hashedPassword => hashedPassword)

    const user = {
      name,
      email,
      password_hash
    }

    try {
      const insertedids = await Knex('users').insert(user);

      const user_id = insertedids[0];

      return res.json({
        id: user_id,
        ...user,
      });
    } catch (error) {
      res.status(401).json({ error })
      console.log(error)
    }
  }

}

export default UsersController;