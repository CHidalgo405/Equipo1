const express = require('express');
const clienteController = require('../controllers/clienteController');
const { update } = require('../models/clienteModel');

const router = express.Router();

router.get('/clientes', clienteController.getAllClientes);
router.get('/clientes/:id', clienteController.getClienteById);
router.post('/clientes', clienteController.createCliente);
router.put('/clientes/:id', clienteController.updateCliente);
router.delete('/clientes/:id', clienteController.deleteCliente);
router.get('/clientes/search/:q', clienteController.searchAllColumns);

// Archivo Excel
router.get('/downloadclientes', clienteController.downloadClientesExcel);

// Ejemplo de uso de esta ruta: http://localhost:3000/api/downloadclientes

module.exports = router;