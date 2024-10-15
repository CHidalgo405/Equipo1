const express = require('express');
const ProductController = require('../controllers/productoController');
const { update } = require('../models/productoModel');

const router = express.Router();

router.get('/productos', ProductController.getAllProductos);
router.get('/productos/:id', ProductController.getProductoById);
router.post('/productos', ProductController.createProducto);
router.put('/productos/:id', ProductController.updateProducto);
router.delete('/productos/:id', ProductController.deleteProducto);
router.get('/productos/search/:q', ProductController.searchAllColumns);

// Nueva ruta para descargar el archivo Excel
router.get('/downloadProductos', ProductController.downloadProductosExcel);

// Ejemplo de uso de esta ruta: http://localhost:3000/api/downloadProducts

module.exports = router;