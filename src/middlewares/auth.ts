// @ts-nocheck
import jwt from 'jsonwebtoken'
require('dotenv').config();
const secret = process.env.JWT_TOKEN;
import { promisify } from 'util'

export default async (req, res, next) => {
  const token = req.headers['token']

  if(!token) {
    return res.status(401).json({ error: "Token not provided!" })
  }

  try {
    const decoded = await promisify(jwt.verify)(token, secret)

    req.userId = decoded.id

    return next()

  } catch (error) {
    res.status(401).json({ error: "Invalid token!" })
  }
  
}