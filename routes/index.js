import { Router } from 'express'

import users from './users.js'
import products from './products.js'
import orders from './orders.js'

const router = Router()

router.use('/api/users', users)
router.use('/api/products', products)
router.use('/api/orders', orders)

export default router
