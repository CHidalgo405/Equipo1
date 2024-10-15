const express = require('express');
const UsuarioController = require('../controllers/usuarioController');
const { update } = require('../models/usuarioModel');
const { validateUser } = require('../middlewares/validation');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();

router.get('/usuarios', authenticate, UsuarioController.getAllUsuarios);
router.get('/usuarios/:id', authenticate, UsuarioController.getUsuarioById);
router.post('/usuarios', authenticate, validateUser, UsuarioController.createUsuario);
router.put('/usuarios/:id', authenticate, validateUser, UsuarioController.updateUsuario);
router.delete('/usuarios/:id', authenticate, UsuarioController.deleteUsuario);
router.get('/usuarios/search/:q', authenticate, UsuarioController.searchAllColumns);

// Archivo Excel
router.get('/downloadUsuarios', UsuarioController.downloadUsuariosExcel);

// Ejemplo de uso de esta ruta: http://localhost:3000/api/downloadUsuarios

module.exports = router;