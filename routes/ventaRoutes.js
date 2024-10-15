const express = require('express');
const VentaController = require('../controllers/ventaController');
const { update } = require('../models/ventaModel');

const router = express.Router();

router.get('/venta', VentaController.getAllVentas);
router.get('/venta/:id', VentaController.getVentaById);
router.post('/venta', VentaController.createVenta);
router.put('/venta/:id', VentaController.updateVenta);
router.delete('/venta/:id', VentaController.deleteVenta);
router.get('/venta/search/:q', VentaController.searchAllColumnsVentas
);

// Nueva ruta para descargar el archivo Excel
router.get('/downloadVenta', VentaController.downloadVentasExcel);

// Ejemplo de uso de esta ruta: http://localhost:3000/api/downloadRol

module.exports = router;