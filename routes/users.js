import { Router } from 'express'
import auth from '../middleware/auth'
import admin from '../middleware/admin'
import {
  getUser,
  registerUser,
  loginUser,
  putProfile,
  deleteUser,
  getUsers,
  putUser,
  deleteProfile,
} from '../controllers/users'
import { catchErrors } from '../middleware/error'

const router = Router()

router.get('/', auth, admin, catchErrors(getUsers))
router.get('/profile', auth, catchErrors(getUser))
router.post('/register', catchErrors(registerUser))
router.post('/login', catchErrors(loginUser))
router.put('/:id', auth, admin, catchErrors(putUser))
router.put('/', auth, catchErrors(putProfile))
router.delete('/:id', auth, admin, catchErrors(deleteUser))
router.delete('/', auth, catchErrors(deleteProfile))

export default router
