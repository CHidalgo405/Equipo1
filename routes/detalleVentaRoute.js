const express = require('express');
const DetalleVentaController = require('../controllers/detalleVentaController');
const { update } = require('../models/detalleVentaModel');

const router = express.Router();

router.get('/detalleVenta', DetalleVentaController.getAllDetalleVentas);
router.get('/detalleVenta/:id', DetalleVentaController.getDetalleVentaById);
router.post('/detalleVenta', DetalleVentaController.createDetalleVenta);
router.put('/detalleVenta/:id', DetalleVentaController.updateDetalleVenta);
router.delete('/detalleVenta/:id', DetalleVentaController.deleteDetalleVenta);
router.get('/detalleVenta/search/:q', DetalleVentaController.searchAllColumnsDetalleVentas);

// Archivo Excel
router.get('/downloadDetalleVenta', DetalleVentaController.downloadDetalleVentasExcel);

// Ejemplo de uso de esta ruta: http://localhost:3000/api/downloadDetalleVenta

module.exports = router;