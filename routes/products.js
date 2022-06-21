import multer from 'multer'

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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'client/public/uploads/products')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`)
  },
})

const upload = multer({ storage })

router.get('/', catchErrors(getProducts))
router.post('/', upload.single('image'), auth, admin, catchErrors(postProduct))
router.put(
  '/:id',
  upload.single('image'),
  auth,
  admin,
  catchErrors(putProduct),
)
router.delete('/:id', auth, admin, catchErrors(deleteProduct))

export default router
