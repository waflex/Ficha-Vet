import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {
  login,
  register,
  logout,
  profile,
  verify,
} from '../controllers/auth.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { loginSchema, registerSchema } from '../schemas/auth.schema.js';

const router = Router();

router.post(
  '/register',
  //authRequired,
  validateSchema(registerSchema),
  register
);
router.post('/login', validateSchema(loginSchema), login);
router.post('/logout', authRequired, logout);
router.get('/profile', authRequired, profile);
router.get('/verify', verify);

export default router;
