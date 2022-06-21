import mongoose from 'mongoose'
import * as Yup from 'yup'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
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
    .min(1, 'The price should be at least 1 characters.'),
  description: Yup.string()
    .required('The description is a required field.')
    .min(3, 'The description should be at least 3 characters.'),
})
