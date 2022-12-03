import { Router } from 'express'
import auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'
import {
  getUser,
  registerUser,
  loginUser,
  putProfile,
  deleteUser,
  getUsers,
  putUser,
  deleteProfile,
} from '../controllers/users.js'
import { catchErrors } from '../middleware/error.js'

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
