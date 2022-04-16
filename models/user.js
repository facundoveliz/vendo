import Joi from 'joi'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      default: '',
    },
  ],
})

export const User = mongoose.model('User', userSchema)

export function validateUserRegister(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(128).required(),
    email: Joi.string().max(128).required(),
    password: Joi.string().min(8).max(128).required(),
  })

  return schema.validate(user)
}

export function validateUserEdit(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(8).required(),
    email: Joi.string().max(128).required(),
    password: Joi.string().min(8).max(128),
  })

  return schema.validate(user)
}
