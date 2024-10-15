const DetalleVenta = require('../models/detalleVentaModel'); // Asegúrate de que esté bien importado
const excel = require('xlsx');

class DetalleVentaController {

    // Obtener todos los detalles de ventas
    static async getAllDetalleVentas(req, res) {
        try {
            const detalleVentas = await DetalleVenta.findAll();
            return res.status(200).json({ code: 200, message: "Operación exitosa", data: detalleVentas });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Buscar en todas las columnas de detalles de ventas usando una cadena de búsqueda
    static async searchAllColumnsDetalleVentas(req, res) {
        try {
            const searchString = req.params.q;
            if (!searchString) {
                return res.status(400).json({ code: 400, message: "El parámetro 'q' es obligatorio", data: null });
            }
            const detalleVentas = await DetalleVenta.searchAllColumns(searchString);
            return res.status(200).json({ code: 200, message: "Operación exitosa", data: detalleVentas });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Crear un nuevo detalle de venta
    static async createDetalleVenta(req, res) {
        try {
            const detalleVenta = await DetalleVenta.create(req.body);
            return res.status(201).json({ code: 201, message: "El detalle de venta fue creado exitosamente", data: detalleVenta });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Obtener un detalle de venta por su ID
    static async getDetalleVentaById(req, res) {
        try {
            const detalleVenta = await DetalleVenta.findById(req.params.id);
            if (!detalleVenta) {
                return res.status(404).json({ code: 404, message: "Detalle de venta no encontrado", data: null });
            }
            return res.status(200).json({ code: 200, message: "Operación exitosa", data: detalleVenta });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Actualizar un detalle de venta por su ID
    static async updateDetalleVenta(req, res) {
        try {
            const detalleVenta = await DetalleVenta.update(req.params.id, req.body);
            if (!detalleVenta) {
                return res.status(404).json({ code: 404, message: "El Detalle de venta no fue encontrado", data: null });
            }
            return res.status(200).json({ code: 200, message: "El Detalle de venta fue actualizado exitosamente", data: detalleVenta });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Eliminar un detalle de venta por su ID
    static async deleteDetalleVenta(req, res) {
        try {
            const detalleVenta = await DetalleVenta.delete(req.params.id);
            if (!detalleVenta) {
                return res.status(404).json({ code: 404, message: "Detalle de venta no encontrado", data: null });
            }
            return res.status(200).json({ code: 200, message: "Detalle de venta eliminado exitosamente", data: null });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Generar y descargar un archivo Excel con la lista de detalles de ventas
    static async downloadDetalleVentasExcel(req, res) {
        try {
            const detalleVentas = await DetalleVenta.generarExcel();

            const workbook = excel.utils.book_new();
            const worksheet = excel.utils.json_to_sheet(detalleVentas);
            excel.utils.book_append_sheet(workbook, worksheet, 'Detalle Ventas');

            const excelBuffer = excel.write(workbook, { type: 'buffer', bookType: 'xlsx' });

            res.setHeader('Content-Disposition', 'attachment; filename=detalle_ventas.xlsx');
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

            res.send(excelBuffer);
        } catch (error) {
            console.error('Error al generar el archivo Excel:', error);
            return res.status(500).json({ code: 500, message: 'Error al generar el archivo Excel.', data: null });
        }
    }
}

module.exports = DetalleVentaController;
