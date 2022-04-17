import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User, validateUserRegister, validateUserEdit } from '../models/user'

import auth from '../middleware/auth'
import admin from '../middleware/admin'

const router = express.Router()

router.get('/', auth, admin, async (req, res) => {
  try {
    const user = await User.find({})
      .select('-password')
      .populate({
        path: 'orders',
        populate: {
          path: 'products',
          model: 'Product',
        },
      })
      // .populate("orders", "products total created")
      .exec()
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ message: 'No users founded' })
    }
  } catch (err) {
    console.log(err)
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findOne({
      _id: id,
    }).select('-password')
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (err) {
    console.log(err)
  }
})

router.post('/register', async (req, res) => {
  try {
    // checks for validation errors with joi
    const { error } = validateUserRegister(req.body)
    if (error) return res.status(400).json(error.details[0].message)

    // checks if the  email is in use
    let user = await User.findOne({
      email: req.body.email,
    })
    if (user) return res.status(400).json('Email is already in use.')

    // creates the new user
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })

    // hash the password
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    // saves the user to the database
    await user.save().then(() => res.json({ message: 'Done!' }))
  } catch (err) {
    console.log(err)
  }
})

router.post('/login', async (req, res) => {
  try {
    // checks if the email is valid
    const user = await User.findOne({
      email: req.body.email,
    })
    if (!user) return res.status(400).json('Invalid email or password')

    // compares hashed passwords
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password,
    )
    if (!validPassword) return res.status(400).json('Invalid email or password')

    // generate token and set it to expire in 30 days
    const token = jwt.sign(
      { _id: user.id, isAdmin: user.isAdmin },
      process.env.JWT_PRIVATE_KEY,
      {
        expiresIn: '30d',
      },
    )

    return res.status(200).json({
      ok: true,
      msg: 'User logged',
      result: token,
    })
  } catch (err) {
    console.log(err)
  }
})

router.put('/edit/:id', auth, admin, async (req, res) => {
  // checks for validation errors with joi
  const { error } = validateUserEdit(req.body)
  if (error) return res.status(400).json(error.details[0].message)

  try {
    if (req.body.password) {
      // hash the password
      const salt = await bcrypt.genSalt(10)
      const password = await bcrypt.hash(req.body.password, salt)

      const user = await User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        password,
      })

      if (!user) {
        return res.status(404).json({ message: 'The user was not found.' })
      }
      return res.status(200).json({ message: 'Done!' })
    }
    const user = await User.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      email: req.body.email,
    })

    if (!user) {
      return res.status(404).json({ message: 'The user was not found.' })
    }
    return res.status(200).json({ message: 'Done!' })
  } catch (err) {
    console.log(err)
  }
})

router.delete('/delete/:id', auth, admin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
      return res.status(404).json({ message: 'The user was not found.' })
    }
    return res.status(200).json({ message: 'Done!' })
  } catch (err) {
    console.log(err)
  }
})

export default router
