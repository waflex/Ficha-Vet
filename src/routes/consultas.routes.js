import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';

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
router.get('/crearConsulta', authRequired);
router.get('/Borrar:id', authRequired);
router.get('/Ver:id', authRequired);
router.get('/Mod:id', authRequired);

export default router;
