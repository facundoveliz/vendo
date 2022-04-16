const express = require('express')

const router = express.Router()
const { Order } = require('../models/order')
const { User } = require('../models/user')

const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

router.get('/', async (req, res) => {
  try {
    const order = await Order.find({})
      .populate('products', 'name price image')
      .populate('user', 'name email')
      .exec()
    if (order) {
      res.json(order)
    } else {
      res.status(404).json({ error: 'Order not found' })
    }
  } catch (err) {
    console.log(err)
  }
})

router.post('/add', auth, admin, async (req, res) => {
  try {
    // creates the new order
    const order = new Order({
      products: req.body.products,
      user: req.body._id,
      total: req.body.total,
    })

    await order
      .save()
      .then(
        // push the order to the orders object of the user
        await User.findByIdAndUpdate(req.body._id, {
          $push: {
            orders: order._id,
          },
        }).then(() => res.status(200).json({ message: 'Done!' })),
      )
      .catch((err) => res.status(400).json({ error: err }))
  } catch (err) {
    console.log(err)
  }
})

router.put('/edit/:id', auth, admin, async (req, res) => {
  // checks for validation errors with joi
  // FIX: this validation
  // const { err } = validate(req.body)
  // if (err) return res.status(400).json(err.details[0].message)

  const order = await Order.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  })

  if (!order) {
    return res.status(404).json({ error: 'Order not found' })
  }
  return res.status(200).json({ message: 'Done!' })
})

router.delete('/delete/:id', auth, admin, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id)
    if (!order) {
      return res.status(404).json({ error: 'Order not found.' })
    }
    return res.status(200).json({ message: 'Done!' })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
