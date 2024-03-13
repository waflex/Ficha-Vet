import { Router } from 'express';
import { getUsuario, getUsuarios } from '../controllers/Usuarios.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();
router.get('/', authRequired, getUsuarios);
router.get('/:id', authRequired, getUsuario);

export default router;
