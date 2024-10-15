const Inventario = require('../models/inventarioModel'); // Asegúrate de que esté bien importado
const excel = require('xlsx');

class InventarioController {
    // Obtener todos los inventarios
    static async getAllInventario(req, res) {
        try {
            const inventarios = await Inventario.findAll();
            return res.status(200).json({ code: 200, message: "Operación exitosa", data: inventarios });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Buscar inventarios en todas las columnas usando una cadena de búsqueda
    static async searchAllColumns(req, res) {
        try {
            const searchString = req.params.q;
            if (!searchString) {
                return res.status(400).json({ code: 400, message: "El parámetro 'q' es obligatorio", data: null });
            }
            const inventarios = await Inventario.searchAllColumns(searchString);
            return res.status(200).json({ code: 200, message: "Operación exitosa", data: inventarios });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Crear un nuevo inventario
    static async createInventario(req, res) {
        try {
            const inventario = await Inventario.create(req.body);
            return res.status(201).json({ code: 201, message: "Inventario creado exitosamente", data: inventario });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Obtener un inventario por su ID
    static async getInventarioById(req, res) {
        try {
            const inventario = await Inventario.findById(req.params.id);
            if (!inventario) {
                return res.status(404).json({ code: 404, message: "Inventario no encontrado", data: null });
            }
            return res.status(200).json({ code: 200, message: "Operación exitosa", data: inventario });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Actualizar un inventario por su ID
    static async updateInventario(req, res) {
        try {
            const inventario = await Inventario.update(req.params.id, req.body);
            if (!inventario) {
                return res.status(404).json({ code: 404, message: "Inventario no encontrado", data: null });
            }
            return res.status(200).json({ code: 200, message: "Inventario actualizado exitosamente", data: inventario });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Eliminar un inventario por su ID
    static async deleteInventario(req, res) {
        try {
            const inventario = await Inventario.delete(req.params.id);
            if (!inventario) {
                return res.status(404).json({ code: 404, message: "Inventario no encontrado", data: null });
            }
            return res.status(200).json({ code: 200, message: "Inventario eliminado exitosamente", data: inventario });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Descargar lista de inventarios en Excel
    static async downloadInventariosExcel(req, res) {
        try {
            const inventarios = await Inventario.generarExcel(); // Cambié este método para obtener todos los inventarios
            const workbook = excel.utils.book_new();
            const worksheet = excel.utils.json_to_sheet(inventarios);
            excel.utils.book_append_sheet(workbook, worksheet, 'Inventarios');

            const excelBuffer = excel.write(workbook, { type: 'buffer', bookType: 'xlsx' });
            res.setHeader('Content-Disposition', 'attachment; filename=inventarios.xlsx');
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.send(excelBuffer);
        } catch (error) {
            console.error('Error al generar el archivo Excel:', error);
            return res.status(500).json({ code: 500, message: 'Error al generar el archivo Excel.', data: null });
        }
    }
}

module.exports = InventarioController;
