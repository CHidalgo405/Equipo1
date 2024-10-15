const express = require('express');
const RolController = require('../controllers/rolController');
const { update } = require('../models/rolModel');

const router = express.Router();

router.get('/rol', RolController.getAllRol);
router.get('/rol/:id', RolController.getRolById);
router.post('/rol', RolController.createRol);
router.put('/rol/:id', RolController.updateRol);
router.delete('/rol/:id', RolController.deleteRol);
router.get('/rol/search/:q', RolController.searchAllColumns);

// Nueva ruta para descargar el archivo Excel
router.get('/downloadRol', RolController.downloadRolsExcel);

// Ejemplo de uso de esta ruta: http://localhost:3000/api/downloadRol

module.exports = router;