const express = require('express');
const EmpleadoController = require('../controllers/empleadoController');
const { update } = require('../models/empleadoModel');

const router = express.Router();

router.get('/empleados', EmpleadoController.getAllEmpleados);
router.get('/empleados/:id', EmpleadoController.getEmpleadoById);
router.post('/empleados', EmpleadoController.createEmpleado);
router.put('/empleados/:id', EmpleadoController.updateEmpleado);
router.delete('/empleados/:id', EmpleadoController.deleteEmpleado);
router.get('/empleados/search/:q', EmpleadoController.searchAllColumns);

// Archivo Excel
router.get('/downloadEmpleados', EmpleadoController.downloadEmpleadosExcel);

// Ejemplo de uso de esta ruta: http://localhost:3000/api/downloadEmpleados

module.exports = router;