import { Router } from 'express';
import {
  getMascotas,
  getMascotasId,
} from '../controllers/Mascotas.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();
router.get('/', authRequired, getMascotas);
router.get('/obtenerMascota/:id', authRequired, getMascotasId);

export default router;
