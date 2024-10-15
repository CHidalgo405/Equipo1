const Empleado = require('../models/empleadoModel'); // Asegúrate de que esté bien importado
const excel = require('xlsx');

class EmpleadoController {

    // Obtener todos los empleados
    static async getAllEmpleados(req, res) {
        try {
            const empleados = await Empleado.findAll();
            return res.status(200).json({ code: 200, message: "Operación exitosa", data: empleados });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Buscar empleados en todas las columnas usando una cadena de búsqueda
    static async searchAllColumns(req, res) {
        try {
            const searchString = req.params.q;
            if (!searchString) {
                return res.status(400).json({ code: 400, message: "El parámetro 'q' es obligatorio", data: null });
            }
            const empleados = await Empleado.searchAllColumns(searchString);
            return res.status(200).json({ code: 200, message: "Operación exitosa", data: empleados });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Crear un nuevo empleado
    static async createEmpleado(req, res) {
        try {
            const empleado = await Empleado.create(req.body);
            return res.status(201).json({ code: 201, message: "Empleado creado exitosamente", data: empleado });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Obtener un empleado por su ID
    static async getEmpleadoById(req, res) {
        try {
            const empleado = await Empleado.findById(req.params.id);
            if (!empleado) {
                return res.status(404).json({ code: 404, message: "Empleado no encontrado", data: null });
            }
            return res.status(200).json({ code: 200, message: "Operación exitosa", data: empleado });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Actualizar un empleado por su ID
    static async updateEmpleado(req, res) {
        try {
            const empleado = await Empleado.update(req.params.id, req.body);
            if (!empleado) {
                return res.status(404).json({ code: 404, message: "Empleado no encontrado", data: null });
            }
            return res.status(200).json({ code: 200, message: "Empleado actualizado exitosamente", data: empleado });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Eliminar un empleado por su ID
    static async deleteEmpleado(req, res) {
        try {
            const empleado = await Empleado.delete(req.params.id);
            if (!empleado) {
                return res.status(404).json({ code: 404, message: "Empleado no encontrado", data: null });
            }
            return res.status(200).json({ code: 200, message: "Empleado eliminado exitosamente", data: null });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Descargar lista de empleados en Excel
    static async downloadEmpleadosExcel(req, res) {
        try {
            const empleados = await Empleado.generarExcel();

            const workbook = excel.utils.book_new();
            const worksheet = excel.utils.json_to_sheet(empleados);
            excel.utils.book_append_sheet(workbook, worksheet, 'Empleados');

            const excelBuffer = excel.write(workbook, { type: 'buffer', bookType: 'xlsx' });

            res.setHeader('Content-Disposition', 'attachment; filename=empleados.xlsx');
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

            res.send(excelBuffer);
        } catch (error) {
            console.error('Error al generar el archivo Excel:', error);
            return res.status(500).json({ code: 500, message: 'Error al generar el archivo Excel.', data: null });
        }
    }
}

module.exports = EmpleadoController;
