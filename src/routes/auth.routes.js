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

router.post('/register', authRequired,register);
router.post('/login', login);
router.post('/logout', authRequired,logout);
router.post('/registrarTutor', authRequired,registrarTutor);
router.get('/profile', authRequired, profile);

export default router;
