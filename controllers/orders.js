import express from 'express'
import Order from '../models/order'
import { User } from '../models/user'

const router = express.Router()

export const getOrders = async (req, res) => {
  const orders = await Order.find({})
    .populate('products', 'name price image')
    .populate('user', 'name email')
    .exec()
  if (orders) {
    return res.status(200).json({
      ok: true,
      msg: 'Orders founded',
      result: orders,
    })
  }
  return res.status(404).json({
    ok: false,
    msg: 'Orders not founded',
  })
}

export const postOrder = async (req, res) => {
  // creates the new order
  const order = new Order({
    products: req.body.products,
    user: req.user._id,
    total: req.body.total,
  })

  await order.save().then(
    // push the order to the orders object of the user
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        orders: order._id,
      },
    }).then(() => res.status(200).json({
      ok: true,
      msg: 'Order created',
      result: order,
    })),
  )
}

export const deleteOrder = async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id)
  if (!order) {
    return res.status(404).json({
      ok: false,
      msg: 'Order not found',
    })
  }
  return res.status(200).json({
    ok: true,
    msg: 'Order deleted',
    result: order,
  })
}

export default router
