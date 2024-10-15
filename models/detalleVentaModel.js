const pool = require('../config/db');

class DetalleVenta {
    static async findAll() { // Lista de todos los detalles de ventas
        try {
            const result = await pool.query('SELECT * FROM detalle_ventas');
            return result.rows;
        } catch (error) {
            console.error('Error al obtener todos los detalles de ventas:', error);
            throw error;
        }
    }

    static async create(data) {
        const { FolioVenta, IdProducto, Cantidad } = data;
        try {
            const result = await pool.query(
                'INSERT INTO detalle_ventas (FolioVenta, IdProducto, Cantidad, created_at) VALUES ($1, $2, $3, current_timestamp) RETURNING *',
                [FolioVenta, IdProducto, Cantidad]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error al crear detalle de venta:', error);
            throw error;
        }
    }

    static async findById(id) {
        try {
            const result = await pool.query('SELECT * FROM detalle_ventas WHERE IdDetalleVenta = $1', [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error al obtener detalle de venta por ID:', error);
            throw error;
        }
    }

    static async update(id, data) {
        const { FolioVenta, IdProducto, Cantidad } = data;
        try {
            const result = await pool.query(
                'UPDATE detalle_ventas SET FolioVenta = $1, IdProducto = $2, Cantidad = $3 WHERE IdDetalleVenta = $4 RETURNING *',
                [FolioVenta, IdProducto, Cantidad, id]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error al actualizar detalle de venta:', error);
            throw error;
        }
    }

    static async delete(id) {
        try {
            const result = await pool.query('DELETE FROM detalle_ventas WHERE IdDetalleVenta = $1 RETURNING *', [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error al eliminar detalle de venta:', error);
            throw error;
        }
    }

    static async searchAllColumns(searchString) {
        try {
            const result = await pool.query(
                `SELECT * FROM detalle_ventas WHERE 
                CAST(FolioVenta AS TEXT) ILIKE $1 OR 
                CAST(IdProducto AS TEXT) ILIKE $1 OR 
                CAST(Cantidad AS TEXT) ILIKE $1`,
                [`%${searchString}%`]
            );
            return result.rows;
        } catch (error) {
            console.error('Error al buscar en todas las columnas de detalle de ventas:', error);
            throw error;
        }
    }

    static async generarExcel() {
        try {
            const result = await pool.query(
                `SELECT FolioVenta, IdProducto, Cantidad FROM detalle_ventas`
            );
            return result.rows;
        } catch (error) {
            console.error('Error al generar Excel de detalle de ventas:', error);
            throw error;
        }
    }
}

module.exports = DetalleVenta;
