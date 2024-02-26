import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { borrarFicha, crearFicha } from '../controllers/Consultas.controller.js';

const router = Router();
/*
Consultas
Crear Consulta
Filtro:algo aqui
Borrar:id
Ver:id
    Mod

*/
router.get('/', authRequired);
router.get('/:id', authRequired);
router.post('/crearConsulta', authRequired, crearFicha);
router.get('/Borrar:id', authRequired, borrarFicha);
router.get('/Ver:id', authRequired);
router.get('/Mod:id', authRequired);

export default router;
