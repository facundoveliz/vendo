import { Router } from 'express'
import auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'
import { deleteOrder, getOrders, postOrder } from '../controllers/orders.js'
import { catchErrors } from '../middleware/error.js'

const router = Router()

router.get('/', auth, admin, catchErrors(getOrders))
router.post('/', auth, admin, catchErrors(postOrder))
router.delete('/:id', auth, admin, catchErrors(deleteOrder))

export default router
