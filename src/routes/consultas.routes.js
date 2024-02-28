import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { borrarFicha, crearFicha, mainficha } from '../controllers/Consultas.controller.js';

const router = Router();
/*
Consultas
Crear Consulta
Filtro:algo aqui
Borrar:id
Ver:id
    Mod

*/
router.get('/', authRequired,mainficha );
router.get('/:id', authRequired);
router.get('/crearConsulta', authRequired, crearFicha);
router.delete('/Borrar:id', authRequired, borrarFicha);
router.get('/Ver:id', authRequired);
router.put('/Mod:id', authRequired);

export default router;
