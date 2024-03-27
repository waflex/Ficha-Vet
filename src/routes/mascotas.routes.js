import { Router } from 'express';
import {
  getFichas,
  getMascotas,
  getMascotasId,
  getTutores,
} from '../controllers/Mascotas.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();
router.get('/', authRequired, getMascotas);
router.get('/obtenerMascota/:id', authRequired, getMascotasId);
router.get('/obtenerTutores', authRequired, getTutores);
router.get('/Fichas/:id', authRequired, getFichas);
export default router;
