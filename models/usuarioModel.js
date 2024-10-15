const pool = require('../config/db');

class Usuario {
    static async findAll() {
        try {
            const result = await pool.query('SELECT * FROM usuarios');
            return result.rows;
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            throw error;
        }
    }

    static async create(data) {
        const {correo, password } = data;
        try {
            const result = await pool.query(
                'INSERT INTO usuarios (correo, password, created_at) VALUES ($1, $2, current_timestamp) RETURNING *',
                [correo, password]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error al crear usuario:', error);
            throw error;
        }
    }

    static async findById(id) {
        try {
            const result = await pool.query('SELECT * FROM usuarios WHERE IdUsuario = $1', [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error al obtener usuario:', error);
            throw error;
        }
    }

    static async update(id, data) {
        const {correo, password } = data;
        try {
            const result = await pool.query(
                'UPDATE usuarios SET correo = $1, password = $2, update_at = current_timestamp WHERE IdUsuario = $3 RETURNING *',
                [correo, password, id]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            throw error;
        }
    }

    static async delete(id) {
        try {
            const result = await pool.query('DELETE FROM usuarios WHERE IdUsuario = $1 RETURNING *', [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            throw error;
        }
    }

    static async searchAllColumns(searchString) {
        try {
            const result = await pool.query(
                `SELECT * FROM usuarios WHERE 
                correo ILIKE $1 OR 
                CAST(created_at AS TEXT) ILIKE $1 OR 
                CAST(update_at AS TEXT) ILIKE $1`,
                [`%${searchString}%`]
            );
            return result.rows;
        } catch (error) {
            console.error('Error al buscar usuarios:', error);
            throw error;
        }
    }

    static async generarExcel() {
        try {
            const result = await pool.query(
                `SELECT correo FROM usuarios`
            );
            return result.rows;
        } catch (error) {
            console.error('Error al generar Excel:', error);
            throw error;
        }
    }
}

module.exports = Usuario;
