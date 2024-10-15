const Usuario = require('../models/usuarioModel');
const excel = require('xlsx'); 

class UsuarioController {
   
    // Obtener todos los usuarios
    static async getAllUsuarios(req, res) {
        try {
            const usuarios = await Usuario.findAll();
            return res.status(200).json({ code: 200, message: "Operación exitosa", data: usuarios });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Buscar usuarios en todas las columnas usando una cadena de búsqueda
    static async searchAllColumns(req, res) {
        try {
            const searchString = req.params.q;  
            if (!searchString) {
                return res.status(400).json({ code: 400, message: "El parámetro 'q' es obligatorio", data: null });
            }
            const usuarios = await Usuario.searchAllColumns(searchString);
            return res.status(200).json({ code: 200, message: "Operación exitosa", data: usuarios });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Crear un nuevo usuario
    static async createUsuario(req, res) {
        try {
            const usuario = await Usuario.create(req.body);
            return res.status(201).json({ code: 201, message: "Usuario creado exitosamente", data: usuario });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Obtener un usuario por su ID
    static async getUsuarioById(req, res) {
        try {
            const usuario = await Usuario.findById(req.params.id);
            if (!usuario) { 
                return res.status(404).json({ code: 404, message: "Usuario no encontrado", data: null });
            }
            return res.status(200).json({ code: 200, message: "Operación exitosa", data: usuario });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Actualizar un usuario por su ID
    static async updateUsuario(req, res) { 
        try {
            const usuario = await Usuario.update(req.params.id, req.body);
            if (!usuario) {
                return res.status(404).json({ code: 404, message: "Usuario no encontrado", data: null });
            }
            return res.status(200).json({ code: 200, message: "Usuario actualizado exitosamente", data: usuario });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Eliminar un usuario por su ID
    static async deleteUsuario(req, res) { 
        try {
            const usuario = await Usuario.delete(req.params.id);
            if (!usuario) {
                return res.status(404).json({ code: 404, message: "Usuario no encontrado", data: null });
            }
            return res.status(200).json({ code: 200, message: "Usuario eliminado exitosamente", data: usuario });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Generar y descargar un archivo Excel con la lista de usuarios
    static async downloadUsuariosExcel(req, res) { 
        try {
            const usuarios = await Usuario.generarExcel();

            const workbook = excel.utils.book_new();
            const worksheet = excel.utils.json_to_sheet(usuarios);
            excel.utils.book_append_sheet(workbook, worksheet, 'usuarios');

            const excelBuffer = excel.write(workbook, { type: 'buffer', bookType: 'xlsx' });

            res.setHeader('Content-Disposition', 'attachment; filename=usuarios.xlsx');
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

            res.send(excelBuffer);
        } catch (error) {
            console.error('Error al generar el archivo Excel:', error);
            return res.status(500).json({ code: 500, message: 'Error al generar el archivo Excel.', data: null });
        }
    }
}

module.exports = UsuarioController;
