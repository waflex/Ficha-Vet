import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {
  login,
  register,
  registrarTutor,
  logout,
  profile,
} from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/registrarTutor', registrarTutor);
router.get('/profile', authRequired, profile);

export default router;
