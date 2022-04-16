import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
})

const Order = mongoose.model('Order', orderSchema)

export default Order
