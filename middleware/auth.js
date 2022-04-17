import jwt from 'jsonwebtoken'
import { User } from '../models/user'

export default async (req, res, next) => {
  if (
    req.headers.authorization
    && req.headers.authorization.startsWith('Bearer')
  ) {
    // checks if a token exists
    const token = req.headers.authorization.split(' ')[1]
    const secret = process.env.JWT_PRIVATE_KEY
    // if it can find an id with the id in the token it will
    // use next() and the middleware will be complete, if not
    // it will use the catch function and thrown an error
    try {
      // decodes the token and verify if its right
      const decoded = jwt.verify(token, secret)
      // searchs for a user with the id of the token and returns it
      req.user = await User.findById(decoded._id).select('-password')
      next()
    } catch (err) {
      res.status(401).json({
        ok: false,
        msg: 'Invalid token',
        result: err,
      })
    }
  } else {
    res.status(401).json({
      ok: false,
      msg: 'No token',
    })
  }
}
