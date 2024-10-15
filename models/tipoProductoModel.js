const pool = require('../config/db'); 

class TipoProducto {
    static async findAll() {
        const result = await pool.query('SELECT * FROM tipo_productos');
        return result.rows;
    }

    static async create(data) {
        const { Tipo } = data;
        const result = await pool.query(
            'INSERT INTO tipo_productos (Tipo) VALUES ($1) RETURNING *',
            [Tipo]
        );
        return result.rows[0];
    }

    static async findById(id) {
        const result = await pool.query('SELECT * FROM tipo_productos WHERE IdTipoProducto = $1', [id]);
        return result.rows[0];
    }

    static async update(id, data) {
        const { Tipo } = data;
        const result = await pool.query(
            'UPDATE tipo_productos SET Tipo = $1 WHERE IdTipoProducto = $2 RETURNING *',
            [Tipo, id]
        );
        return result.rows[0];
    }

    static async delete(id) {
        const result = await pool.query('DELETE FROM tipo_productos WHERE IdTipoProducto = $1 RETURNING *', [id]);
        return result.rows[0];
    }
    static async searchAllColumns(searchString) {
        const result = await pool.query(
            `SELECT * FROM tipo_productos WHERE 
            Tipo ILIKE $1`,
            [`%${searchString}%`]
        );
        return result.rows;
    }

    static async generarExcel() {
        const result = await pool.query(
            `SELECT Tipo FROM tipo_productos`
        );
        return result.rows;
    }
}

module.exports = TipoProducto;