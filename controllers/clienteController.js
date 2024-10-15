const Cliente = require('../models/clienteModel'); // Verifica que el modelo esté bien importado
const excel = require('xlsx');

class ClienteController {

    static async getAllClientes(req, res) {
        try {
            const clientes = await Cliente.findAll();
            return res.status(200).json({ code: 200, message: "Operación exitosa", data: clientes });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    static async searchAllColumns(req, res) {
        try {
            const searchString = req.params.q;
            if (!searchString) {
                return res.status(400).json({ code: 400, message: "El parámetro 'q' es obligatorio", data: null });
            }
            const clientes = await Cliente.searchAllColumns(searchString);
            return res.status(200).json({ code: 200, message: "Operación exitosa", data: clientes });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    static async createCliente(req, res) {
        // Aquí podrías validar los datos de req.body antes de crear el cliente
        try {
            const cliente = await Cliente.create(req.body);
            return res.status(201).json({ code: 201, message: "Cliente creado exitosamente", data: cliente });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    static async getClienteById(req, res) {
        try {
            const cliente = await Cliente.findById(req.params.id);
            if (!cliente) {
                return res.status(404).json({ code: 404, message: "Cliente no encontrado", data: null });
            }
            return res.status(200).json({ code: 200, message: "Operación exitosa", data: cliente });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    static async updateCliente(req, res) {
        // Aquí también podrías agregar validaciones para req.body
        try {
            const updatedCliente = await Cliente.update(req.params.id, req.body);
            if (!updatedCliente) {
                return res.status(404).json({ code: 404, message: "Cliente no encontrado", data: null });
            }
            return res.status(200).json({ code: 200, message: "Cliente actualizado exitosamente", data: updatedCliente });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    static async deleteCliente(req, res) {
        try {
            const clienteDeleted = await Cliente.delete(req.params.id);
            if (!clienteDeleted) {
                return res.status(404).json({ code: 404, message: "Cliente no encontrado", data: null });
            }
            return res.status(200).json({ code: 200, message: "Cliente eliminado exitosamente", data: null });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    static async downloadClientesExcel(req, res) {
        try {
            const clientes = await Cliente.generarExcel();

            const workbook = excel.utils.book_new();
            const worksheet = excel.utils.json_to_sheet(clientes);
            excel.utils.book_append_sheet(workbook, worksheet, 'clientes');

            const excelBuffer = excel.write(workbook, { type: 'buffer', bookType: 'xlsx' });

            res.setHeader('Content-Disposition', 'attachment; filename=clientes.xlsx');
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

            res.send(excelBuffer);
        } catch (error) {
            console.error('Error al generar el archivo Excel:', error);
            return res.status(500).json({ code: 500, message: 'Error al generar el archivo Excel.', data: null });
        }
    }
}

module.exports = ClienteController;
