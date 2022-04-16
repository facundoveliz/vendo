import Joi from 'joi'
import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    default: 'default.jpg',
  },
  imageKey: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
})

export const Product = mongoose.model('Product', productSchema)

export function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(124).required(),
    price: Joi.number().min(1).required(),
    description: Joi.string().min(3).max(4096).required(),
  })

  return schema.validate(product)
}
