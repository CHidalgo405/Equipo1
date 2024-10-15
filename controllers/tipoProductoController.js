const TipoProducto = require('../models/tipoProductoModel');
const excel = require('xlsx'); 

class TipoProductoController {
    // Obtener todos los tipos de productos
    static async getAllTipoProductos(req, res) {
        try {
            const tipoProductos = await TipoProducto.findAll();
            return res.status(200).json({ code: 200, message: "Operación exitosa", data: tipoProductos });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Buscar en todas las columnas usando una cadena de búsqueda
    static async searchAllColumns(req, res) {
        try {
            const searchString = req.params.q;  
            if (!searchString) {
                return res.status(400).json({ code: 400, message: "El parámetro 'q' es obligatorio", data: null });
            }
            const tipoProductos = await TipoProducto.searchAllColumns(searchString);
            return res.status(200).json({ code: 200, message: "Operación exitosa", data: tipoProductos });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Crear un nuevo tipo de producto
    static async createTipoProducto(req, res) {
        try {
            const tipoProducto = await TipoProducto.create(req.body);
            return res.status(201).json({ code: 201, message: "El tipo de producto fue creado exitosamente", data: tipoProducto });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Obtener un tipo de producto por su ID
    static async getTipoProductoById(req, res) {
        try {
            const tipoProducto = await TipoProducto.findById(req.params.id);
            if (!tipoProducto) { 
                return res.status(404).json({ code: 404, message: "Tipo de producto no encontrado", data: null });
            }
            return res.status(200).json({ code: 200, message: "Operación exitosa", data: tipoProducto });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Actualizar un tipo de producto por su ID
    static async updateTipoProducto(req, res) { 
        try {
            const tipoProducto = await TipoProducto.update(req.params.id, req.body);
            if (!tipoProducto) {
                return res.status(404).json({ code: 404, message: "Tipo de producto no encontrado", data: null });
            }
            return res.status(200).json({ code: 200, message: "El Tipo de producto fue actualizado exitosamente", data: tipoProducto });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Eliminar un tipo de producto por su ID
    static async deleteTipoProducto(req, res) { 
        try {                                                                                                                                                                                                        
            const tipoProducto = await TipoProducto.delete(req.params.id);
            if (!tipoProducto) {
                return res.status(404).json({ code: 404, message: "Tipo de producto no encontrado", data: null });
            }
            return res.status(200).json({ code: 200, message: "Tipo de producto eliminado exitosamente", data: tipoProducto });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }         
    }

    // Descargar lista de tipos de productos en Excel
    static async downloadTipoProductosExcel(req, res) {                                                                                                                                                                                                         
        try {                                                                                                                                                                                                          
            const tipoProductos = await TipoProducto.generarExcel();  
            const workbook = excel.utils.book_new();
            const worksheet = excel.utils.json_to_sheet(tipoProductos);                                                                                                                                                                                                             
            excel.utils.book_append_sheet(workbook, worksheet, 'tipoProductos');

            const excelBuffer = excel.write(workbook, { type: 'buffer', bookType: 'xlsx' });

            res.setHeader('Content-Disposition', 'attachment; filename=tipoProductos.xlsx');                                                                                                                                                                                                           
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

            res.send(excelBuffer);
        } catch (error) {
            console.error('Error al generar el archivo Excel:', error);
            return res.status(500).json({ code: 500, message: 'Error al generar el archivo Excel.', data: null });
        }
    }
}

module.exports = TipoProductoController;
