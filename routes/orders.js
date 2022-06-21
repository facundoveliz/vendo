import { Router } from 'express'
import auth from '../middleware/auth'
import admin from '../middleware/admin'
import { deleteOrder, getOrders, postOrder } from '../controllers/orders'
import { catchErrors } from '../middleware/error'

const router = Router()

router.get('/', auth, admin, catchErrors(getOrders))
router.post('/', auth, admin, catchErrors(postOrder))
router.delete('/:id', auth, admin, catchErrors(deleteOrder))

export default router
