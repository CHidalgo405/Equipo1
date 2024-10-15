const pool = require('../config/db');

class Inventario {
    static async findAll() { // Lista de todos los inventarios
        try {
            const result = await pool.query('SELECT * FROM inventarios WHERE delete_at IS NULL');
            return result.rows;
        } catch (error) {
            console.error('Error al obtener inventarios:', error);
            throw error; // Lanza el error para manejarlo en el controlador
        }
    }

    static async create(data) {
        const { Cantidad, IdProducto, NombreProducto } = data; // Ajuste para incluir NombreProducto
        try {
            const result = await pool.query(
                'INSERT INTO inventarios (Cantidad, IdProducto, NombreProducto, created_at) VALUES ($1, $2, $3, current_timestamp) RETURNING *',
                [Cantidad, IdProducto, NombreProducto]
            );
            return result.rows[0]; // Devuelve el nuevo inventario creado
        } catch (error) {
            console.error('Error al crear inventario:', error);
            throw error; // Lanza el error para manejarlo en el controlador
        }
    }

    static async findById(id) {
        try {
            const result = await pool.query('SELECT * FROM inventarios WHERE IdInventario = $1 AND delete_at IS NULL', [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error al obtener inventario:', error);
            throw error; // Lanza el error para manejarlo en el controlador
        }
    }

    static async update(id, data) {
        const { Cantidad, IdProducto } = data;
        try {
            const result = await pool.query(
                'UPDATE inventarios SET Cantidad = $1, IdProducto = $2, update_at = current_timestamp WHERE IdInventario = $3 AND delete_at IS NULL RETURNING *',
                [Cantidad, IdProducto, id]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error al actualizar inventario:', error);
            throw error; // Lanza el error para manejarlo en el controlador
        }
    }

    static async delete(id) {
        try {
            const result = await pool.query(
                'UPDATE inventarios SET delete_at = current_timestamp WHERE IdInventario = $1 AND delete_at IS NULL RETURNING *',
                [id]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error al eliminar inventario:', error);
            throw error; // Lanza el error para manejarlo en el controlador
        }
    }

    static async searchAllColumns(searchString) {
        try {
            const result = await pool.query(
                `SELECT * FROM inventarios WHERE 
                CAST(Cantidad AS TEXT) ILIKE $1 OR 
                IdProducto::TEXT ILIKE $1 OR 
                CAST(created_at AS TEXT) ILIKE $1 OR 
                CAST(update_at AS TEXT) ILIKE $1 OR 
                CAST(delete_at AS TEXT) ILIKE $1`,
                [`%${searchString}%`]
            );
            return result.rows;
        } catch (error) {
            console.error('Error al buscar inventarios:', error);
            throw error; // Lanza el error para manejarlo en el controlador
        }
    }

    static async generarExcel() {
        try {
            const result = await pool.query(
                `SELECT Cantidad, IdProducto, NombreProducto 
                 FROM inventarios 
                 WHERE delete_at IS NULL`
            );
            return result.rows;
        } catch (error) {
            console.error('Error al generar Excel de inventarios:', error);
            throw error; // Lanza el error para manejarlo en el controlador
        }
    }
}

module.exports = Inventario;
