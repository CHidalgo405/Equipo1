const Rol = require('../models/rolModel');
const excel = require('xlsx'); 

class RolController {
   
    // Obtener todos los roles
    static async getAllRol(req, res) {
        try {
            const rols = await Rol.findAll();
            return res.status(200).json({ code: 200, message: "Operación exitosa", data: rols });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Buscar roles en todas las columnas usando una cadena de búsqueda
    static async searchAllColumns(req, res) {
        try {
            const searchString = req.params.q;  
            if (!searchString) {
                return res.status(400).json({ code: 400, message: "El parámetro 'q' es obligatorio", data: null });
            }
            const rols = await Rol.searchAllColumns(searchString);
            return res.status(200).json({ code: 200, message: "Operación exitosa", data: rols });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Crear un nuevo rol
    static async createRol(req, res) {
        try {
            const rol = await Rol.create(req.body);
            return res.status(201).json({ code: 201, message: "Rol creado exitosamente", data: rol });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Obtener un rol por su ID
    static async getRolById(req, res) {
        try {
            const rol = await Rol.findById(req.params.id);
            if (!rol) { 
                return res.status(404).json({ code: 404, message: "Rol no encontrado", data: null });
            }
            return res.status(200).json({ code: 200, message: "Operación exitosa", data: rol });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Actualizar un rol por su ID
    static async updateRol(req, res) { 
        try {
            const rol = await Rol.update(req.params.id, req.body);
            if (!rol) {
                return res.status(404).json({ code: 404, message: "Rol no encontrado", data: null });
            }
            return res.status(200).json({ code: 200, message: "Rol actualizado exitosamente", data: rol });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Eliminar un rol por su ID
    static async deleteRol(req, res) { 
        try {
            const rol = await Rol.delete(req.params.id);
            if (!rol) {
                return res.status(404).json({ code: 404, message: "Rol no encontrado", data: null });
            }
            return res.status(200).json({ code: 200, message: "Rol eliminado exitosamente", data: rol });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Descargar lista de roles en Excel
    static async downloadRolsExcel(req, res) { 
        try {
            const rols = await Rol.generarExcel();
            const workbook = excel.utils.book_new();
            const worksheet = excel.utils.json_to_sheet(rols);
            excel.utils.book_append_sheet(workbook, worksheet, 'rols');

            const excelBuffer = excel.write(workbook, { type: 'buffer', bookType: 'xlsx' });

            res.setHeader('Content-Disposition', 'attachment; filename=rols.xlsx');
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

            res.send(excelBuffer);
        } catch (error) {
            console.error('Error al generar el archivo Excel:', error);
            return res.status(500).json({ code: 500, message: 'Error al generar el archivo Excel.', data: null });
        }
    }
}

module.exports = RolController;
