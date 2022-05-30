import mongoose from 'mongoose'
import * as Yup from 'yup'

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

export const schema = Yup.object().shape({
  name: Yup.string()
    .required('The name is a required field.')
    .min(3, 'The name should be at least 3 characters.')
    .max(128, 'The name should not have more than 128 characters.'),
  price: Yup.number()
    .required('The price is a required field.')
    .min(1, 'The name should be at least 3 characters.')
    .max(128, 'The name should not have more than 128 characters.'),
  description: Yup.string()
    .required('The description is a required field.')
    .min(3, 'The name should be at least 3 characters.')
    .max(4096, 'The name should not have more than 128 characters.'),
})
