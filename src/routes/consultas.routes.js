import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {
  borrarFicha,
  crearFicha,
  mainficha,
  mainfichaID,
  crearControl,
} from '../controllers/Consultas.controller.js';

const router = Router();

router.get('/', mainficha);
router.get('/:id', authRequired, mainfichaID);
router.post('/crearConsulta', crearFicha);
router.post('/crearControl', crearControl);
router.delete('/Borrar:id', authRequired, borrarFicha);
router.get('/Ver:id', authRequired);
router.put('/Mod:id', authRequired);

export default router;
