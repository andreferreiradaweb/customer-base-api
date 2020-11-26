// @ts-nocheck

import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Knex from '../database/connection';
import * as Yup from 'yup';
import Bcrypt from 'bcrypt'
require('dotenv').config();
const secret = process.env.JWT_TOKEN;

class SessionController {
  async store(req: Request, res: Response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = req.body;

    const user = await Knex('users').where('email', email);

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const insertedId = user[0]

    const { id, name, email, password_hash } = insertedId;

    const isAuthenticated = await Bcrypt.compare(password, password_hash)

    if (!isAuthenticated) {
      return res.status(401).json({ error: 'Password does not match!' })
    }
    
    return res.json({ 
      user: { 
        id,
        name,
        email 
      },
      token: 
        jwt.sign( { id }, 
        secret, {
            expiresIn: '7d',
        })
    })
    
  }
}

export default SessionController;
