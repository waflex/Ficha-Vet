import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {
  borrarFicha,
  crearFicha,
  mainficha,
  mainfichaID,
  crearControl,
  getControl,
  cancelarVariosControles,
} from '../controllers/Consultas.controller.js';

const router = Router();

router.get('/', mainficha);
router.get('/getFicha/:id', authRequired, mainfichaID);
router.post('/crearConsulta', crearFicha);
router.post('/crearControl', crearControl);
router.delete('/Borrar:id', authRequired, borrarFicha);
router.get('/Ver:id', authRequired);
router.put('/Mod:id', authRequired);
router.get('/getControles/', getControl);
router.put('/cancelarControles/', authRequired, cancelarVariosControles);

export default router;
