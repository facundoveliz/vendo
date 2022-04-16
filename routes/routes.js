import { Router } from 'express'
import users from './users'
import products from './products'
import orders from './orders'

const router = Router()

router.use('/api/users', users)
router.use('/api/products', products)
router.use('/api/orders', orders)

export default router
