const express = require('express');
const TipoProductoController = require('../controllers/tipoProductoController');
const { update } = require('../models/tipoProductoModel');

const router = express.Router();

router.get('/tipoProducto', TipoProductoController.getAllTipoProductos);
router.get('/tipoProducto/:id', TipoProductoController.getTipoProductoById);
router.post('/tipoProducto', TipoProductoController.createTipoProducto);
router.put('/tipoProducto/:id', TipoProductoController.updateTipoProducto);
router.delete('/tipoProducto/:id', TipoProductoController.deleteTipoProducto);
router.get('/tipoProducto/search/:q', TipoProductoController.searchAllColumns);

// Archivo Excel
router.get('/downloadTipoProducto', TipoProductoController.downloadTipoProductosExcel);

// Ejemplo de uso de esta ruta: http://localhost:3000/api/downloadTipoProducto

module.exports = router;