import { Router } from 'express'
import auth from '../middleware/auth'
import admin from '../middleware/admin'
import {
  getUser,
  registerUser,
  loginUser,
  putUser,
  deleteUser,
  getUsers,
} from '../controllers/users'
import { catchErrors } from '../middleware/error'

const router = Router()

router.get('/', auth, admin, catchErrors(getUsers))
router.get('/profile', auth, catchErrors(getUser))
router.post('/register', catchErrors(registerUser))
router.post('/login', catchErrors(loginUser))
router.put('/', auth, admin, catchErrors(putUser))
router.delete('/', auth, catchErrors(deleteUser))

export default router
