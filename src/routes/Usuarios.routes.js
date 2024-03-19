import { Router } from 'express';
import {
  UpdateUsuario,
  getUsuario,
  getUsuarios,
} from '../controllers/Usuarios.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();
router.get('/', authRequired, getUsuarios);
router.get('/obtenerUsuario/:id', authRequired, getUsuario);
router.put('/actualizarUsuario/:id', authRequired, UpdateUsuario);

export default router;
