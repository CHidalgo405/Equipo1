const express = require('express');
const InventarioController = require('../controllers/inventarioController');
const { update } = require('../models/inventarioModel');

const router = express.Router();

router.get('/inventario', InventarioController.getAllInventario);
router.get('/inventario/:id', InventarioController.getInventarioById);
router.post('/inventario', InventarioController.createInventario);
router.put('/inventario/:id', InventarioController.updateInventario);
router.delete('/inventario/:id', InventarioController.deleteInventario);
router.get('/inventario/search/:q', InventarioController.searchAllColumns);

// Archivo Excel
router.get('/downloadInventario', InventarioController.downloadInventariosExcel);

// Ejemplo de uso de esta ruta: http://localhost:3000/api/downloadInventario

module.exports = router;