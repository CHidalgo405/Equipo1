const pool = require('../config/db');

class Venta {
    static async findAll() { // Lista de todas las ventas
        try {
            const result = await pool.query('SELECT * FROM ventas');
            return result.rows;
        } catch (error) {
            console.error('Error al obtener todas las ventas:', error);
            throw error; // Lanza el error para manejarlo en el controlador
        }
    }

    static async create(data) {
        const { Total, FechaVenta, IdCliente, IdEmpleado } = data;

        try {
            // Validar campos requeridos
            if (Total == null || Total === '') {
                throw new Error('Total es requerido');
            }
            if (FechaVenta == null || FechaVenta === '') {
                throw new Error('FechaVenta es requerida');
            }
            if (IdCliente == null || IdCliente === '') {
                throw new Error('IdCliente es requerido');
            }
            if (IdEmpleado == null || IdEmpleado === '') {
                throw new Error('IdEmpleado es requerido');
            }

            const result = await pool.query(
                'INSERT INTO ventas (Total, FechaVenta, IdCliente, IdEmpleado, created_at) VALUES ($1, $2, $3, $4, current_timestamp) RETURNING *',
                [Total, FechaVenta, IdCliente, IdEmpleado]
            );
            return result.rows[0]; // Devuelve la nueva venta creada
        } catch (error) {
            console.error('Error al crear venta:', error);
            throw error; // Lanza el error para manejarlo en el controlador
        }
    }

    static async findById(id) {
        try {
            const result = await pool.query('SELECT * FROM ventas WHERE FolioVenta = $1', [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error al obtener venta por ID:', error);
            throw error; // Lanza el error para manejarlo en el controlador
        }
    }

    static async update(id, data) {
        const { Total, FechaVenta, IdCliente, IdEmpleado } = data;
        try {
            const result = await pool.query(
                'UPDATE ventas SET Total = $1, FechaVenta = $2, IdCliente = $3, IdEmpleado = $4 WHERE FolioVenta = $5 RETURNING *',
                [Total, FechaVenta, IdCliente, IdEmpleado, id]
            );
            return result.rows[0]; // Devuelve la venta actualizada
        } catch (error) {
            console.error('Error al actualizar venta:', error);
            throw error; // Lanza el error para manejarlo en el controlador
        }
    }

    static async delete(id) {
        try {
            const result = await pool.query('DELETE FROM ventas WHERE FolioVenta = $1 RETURNING *', [id]);
            return result.rows[0]; // Devuelve la venta eliminada
        } catch (error) {
            console.error('Error al eliminar venta:', error);
            throw error; // Lanza el error para manejarlo en el controlador
        }
    }

    static async searchAllColumns(searchString) {
        try {
            const result = await pool.query(
                `SELECT * FROM ventas WHERE 
                CAST(Total AS TEXT) ILIKE $1 OR 
                CAST(FechaVenta AS TEXT) ILIKE $1 OR 
                CAST(IdCliente AS TEXT) ILIKE $1 OR 
                CAST(IdEmpleado AS TEXT) ILIKE $1`,
                [`%${searchString}%`]
            );
            return result.rows;
        } catch (error) {
            console.error('Error al buscar ventas en todas las columnas:', error);
            throw error; // Lanza el error para manejarlo en el controlador
        }
    }

    static async generarExcel() {
        try {
            const result = await pool.query(
                `SELECT Total, FechaVenta, IdCliente, IdEmpleado FROM ventas`
            );
            return result.rows; // Devuelve los datos necesarios para generar el Excel
        } catch (error) {
            console.error('Error al generar Excel de ventas:', error);
            throw error; // Lanza el error para manejarlo en el controlador
        }
    }
}

module.exports = Venta;
