const Venta = require('../models/ventaModel'); // Asegúrate de que esté bien importado
const excel = require('xlsx');

class VentaController {

    // Obtener todas las ventas
    static async getAllVentas(req, res) {
        try {
            const ventas = await Venta.findAll();
            return res.status(200).json({ code: 200, message: "Operación exitosa", data: ventas });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Buscar ventas en todas las columnas usando una cadena de búsqueda
    static async searchAllColumnsVentas(req, res) {
        try {
            const searchString = req.params.q;
            if (!searchString) {
                return res.status(400).json({ code: 400, message: "El parámetro 'q' es obligatorio", data: null });
            }
            const ventas = await Venta.searchAllColumns(searchString);
            return res.status(200).json({ code: 200, message: "Operación exitosa", data: ventas });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Crear una nueva venta
    static async createVenta(req, res) {
        try {
            const venta = await Venta.create(req.body);
            return res.status(201).json({ code: 201, message: "Venta creada exitosamente", data: venta });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Obtener una venta por su ID (FolioVenta)
    static async getVentaById(req, res) {
        try {
            const venta = await Venta.findById(req.params.id);
            if (!venta) {
                return res.status(404).json({ code: 404, message: "Operación de venta no encontrada", data: null });
            }
            return res.status(200).json({ code: 200, message: "Operación exitosa", data: venta });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Actualizar una venta por su ID
    static async updateVenta(req, res) {
        try {
            const venta = await Venta.update(req.params.id, req.body);
            if (!venta) {
                return res.status(404).json({ code: 404, message: "Operación de venta no encontrada", data: null });
            }
            return res.status(200).json({ code: 200, message: "Venta actualizada exitosamente", data: venta });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Eliminar una venta por su ID
    static async deleteVenta(req, res) {
        try {
            const venta = await Venta.delete(req.params.id);
            if (!venta) {
                return res.status(404).json({ code: 404, message: "Operación de venta no encontrada", data: null });
            }
            return res.status(200).json({ code: 200, message: "Venta eliminada exitosamente", data: null });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Generar y descargar un archivo Excel con la lista de ventas
    static async downloadVentasExcel(req, res) {
        try {
            const ventas = await Venta.generarExcel();

            const workbook = excel.utils.book_new();
            const worksheet = excel.utils.json_to_sheet(ventas);
            excel.utils.book_append_sheet(workbook, worksheet, 'ventas');

            const excelBuffer = excel.write(workbook, { type: 'buffer', bookType: 'xlsx' });

            res.setHeader('Content-Disposition', 'attachment; filename=ventas.xlsx');
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

            res.send(excelBuffer);
        } catch (error) {
            console.error('Error al generar el archivo Excel:', error);
            return res.status(500).json({ code: 500, message: 'Error al generar el archivo Excel.', data: null });
        }
    }
}

module.exports = VentaController;
