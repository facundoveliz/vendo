import { Router } from 'express'
import auth from '../middleware/auth'
import admin from '../middleware/admin'
import {
  deleteProduct,
  getProducts,
  postProduct,
  putProduct,
} from '../controllers/products'
import { catchErrors } from '../middleware/error'

const router = Router()

router.get('/', catchErrors(getProducts))
router.post('/', auth, admin, catchErrors(postProduct))
router.put('/:id', auth, admin, catchErrors(putProduct))
router.delete('/:id', auth, admin, catchErrors(deleteProduct))

export default router
