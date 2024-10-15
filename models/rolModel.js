const pool = require('../config/db'); 

class Rol {
    static async findAll() {
        try {
            const result = await pool.query('SELECT * FROM roles');
            return result.rows;
        } catch (error) {
            console.error('Error al obtener roles:', error);
            throw error; // Puedes decidir si lanzar el error o manejarlo de otra forma
        }
    }

    static async create(data) {
        const { TipoRol } = data;
        try {
            const result = await pool.query(
                'INSERT INTO roles (TipoRol) VALUES ($1) RETURNING *',
                [TipoRol]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error al crear rol:', error);
            throw error;
        }
    }

    static async findById(id) {
        try {
            const result = await pool.query('SELECT * FROM roles WHERE IdRol = $1', [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error al obtener rol:', error);
            throw error;
        }
    }

    static async update(id, data) {
        const { TipoRol } = data;
        try {
            const result = await pool.query(
                'UPDATE roles SET TipoRol = $1 WHERE IdRol = $2 RETURNING *',
                [TipoRol, id]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error al actualizar rol:', error);
            throw error;
        }
    }

    static async delete(id) {
        try {
            const result = await pool.query('DELETE FROM roles WHERE IdRol = $1 RETURNING *', [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error al eliminar rol:', error);
            throw error;
        }
    }

    static async searchAllColumns(searchString) {
        try {
            const result = await pool.query(
                `SELECT * FROM roles WHERE 
                TipoRol ILIKE $1`,
                [`%${searchString}%`]
            );
            return result.rows;
        } catch (error) {
            console.error('Error al buscar roles:', error);
            throw error;
        }
    }

    static async generarExcel() {
        try {
            const result = await pool.query(
                `SELECT TipoRol FROM roles`
            );
            return result.rows;
        } catch (error) {
            console.error('Error al generar Excel de roles:', error);
            throw error;
        }
    }
}

module.exports = Rol;
