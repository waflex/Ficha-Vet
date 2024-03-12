import { Router } from 'express';
import { getUsuario, getUsuarios } from '../controllers/Usuarios.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();
router.post('/Usuarios', authRequired, getUsuarios);
router.post('/Usuario/:id', authRequired, getUsuario);

export default router;
