import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User, schema, putSchema } from '../models/user.js'

const router = express.Router()

// TODO: populate orders
export const getUsers = async (req, res) => {
  const users = await User.find({})
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
  if (!users) {
    return res.status(404).json({
      ok: false,
      msg: 'Users not founded',
    })
  }
  return res.status(200).json({
    ok: true,
    msg: 'Users founded',
    result: users,
  })
}

export const getUser = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password')
  if (!user) {
    return res.status(404).json({
      ok: false,
      msg: 'User not founded',
    })
  }
  return res.status(200).json({
    ok: true,
    msg: 'User founded',
    result: user,
  })
}

export const registerUser = async (req, res) => {
  // checks for validation errors
  schema
    .validate(req.body)
    .then(async () => {
      // checks if the email is valid
      let user = await User.findOne({
        email: req.body.email,
      })
      // if the email exists, the func ends here
      if (user) {
        return res.status(400).json({
          ok: false,
          msg: 'Email already in use',
        })
      }

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
      await user.save().then(() => res.status(200).json({
        ok: true,
        msg: 'User created',
      }))
    })
    .catch((err) => res.status(400).json({
      ok: false,
      msg: 'Validation error',
      result: err,
    }))
}

export const loginUser = async (req, res) => {
  // checks if the email is valid
  const user = await User.findOne({
    email: req.body.email,
  })
  // if the email doesn't exists, the func ends here
  if (!user) {
    return res.status(400).json({
      ok: false,
      msg: 'Invalid email or password',
    })
  }

  // compares hashed passwords
  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) {
    return res.status(400).json({
      ok: false,
      msg: 'Invalid email or password',
    })
  }

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
}

export const putUser = async (req, res) => {
  putSchema
    .validate(req.body)
    .then(async () => {
      const user = await User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
      })

      if (!user) {
        return res.status(404).json({
          ok: false,
          msg: 'User not found',
        })
      }
      return res.status(200).json({
        ok: true,
        msg: 'User updated',
      })
    })
    .catch((err) => res.status(400).json({
      ok: false,
      msg: 'Validation error',
      result: err,
    }))
}

export const putProfile = async (req, res) => {
  // finds the user and saves the body to newUser for
  // comparing them if they are the same or for email validation
  const user = await User.findById(req.user._id)
  const newUser = {
    name: user.name,
    email: user.email,
    password: user.password,
  }

  // verifies that the name in the req is not the same as the
  // actual and verifies that the length is higher than 1
  if (req.body.name !== user.name && req.body.name.length >= 1) newUser.name = req.body.name
  if (req.body.email !== user.email && req.body.name.length >= 1) {
    // checks if the email is exists
    const emailCheck = await User.findOne({
      email: req.body.email,
    })
    // if the email exists, the func ends here
    if (emailCheck !== null) {
      return res.status(400).json({
        ok: false,
        msg: 'Email already in use',
      })
    }
    newUser.email = req.body.email
  }
  if (req.body.password.length >= 1) {
    newUser.password = req.body.password
    // hash the password
    const salt = await bcrypt.genSalt(10)
    newUser.password = await bcrypt.hash(newUser.password, salt)
  }

  await User.findByIdAndUpdate(req.user._id, newUser).then(() => {
    res.status(200).json({
      ok: true,
      msg: 'User updated',
    })
  })
}

export const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id)
  if (!user) {
    res.status(404).json({
      ok: false,
      msg: 'User not founded',
    })
  }
  res.status(200).json({
    ok: true,
    msg: 'User deleted',
  })
}

export const deleteProfile = async (req, res) => {
  const user = await User.findByIdAndDelete(req.user._id)
  if (!user) {
    res.status(404).json({
      ok: false,
      msg: 'User not founded',
    })
  }
  res.status(200).json({
    ok: true,
    msg: 'User deleted',
  })
}

export default router
