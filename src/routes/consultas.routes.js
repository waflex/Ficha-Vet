import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {
  borrarFicha,
  crearFicha,
  mainficha,
  mainfichaID,
  getMascota,
  getTutor,
} from '../controllers/Consultas.controller.js';

const router = Router();

router.get('/', mainficha);
router.get('/:id', authRequired, mainfichaID);
router.get('/getTutor/:id', getTutor);
router.get('/getMascota/:id', getMascota);
router.post('/crearConsulta', crearFicha);
router.delete('/Borrar:id', authRequired, borrarFicha);
router.get('/Ver:id', authRequired);
router.put('/Mod:id', authRequired);

export default router;
