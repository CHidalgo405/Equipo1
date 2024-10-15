const pool = require('../config/db');

class Cliente {
    static async findAll() { 
        const result = await pool.query('SELECT * FROM clientes WHERE delete_at IS NULL');
        return result.rows;
    }

    static async create(data) {
        const { Nombre, ApellidoPaterno, ApellidoMaterno, FechaNacimiento, Telefono, IdUsuario } = data;
        
        if (!Nombre) {
            throw new Error("El campo Nombre no puede estar vacío");
        }
    
        const result = await pool.query(
            'INSERT INTO clientes (Nombre, ApellidoPaterno, ApellidoMaterno, FechaNacimiento, Telefono, IdUsuario, created_at) VALUES ($1, $2, $3, $4, $5, $6, current_timestamp) RETURNING *',
            [Nombre, ApellidoPaterno, ApellidoMaterno, FechaNacimiento, Telefono, IdUsuario]
        );
        return result.rows[0];
    }
    

    static async findById(id) {
        const result = await pool.query('SELECT * FROM clientes WHERE IdCliente = $1 AND delete_at IS NULL', [id]);
        return result.rows[0];
    }

    static async update(id, data) {
        const { Nombre, ApellidoPaterno, ApellidoMaterno, FechaNacimiento, Telefono, IdUsuario } = data;
        const result = await pool.query(
            'UPDATE clientes SET Nombre = $1, ApellidoPaterno = $2, ApellidoMaterno = $3, FechaNacimiento = $4, Telefono = $5, IdUsuario = $6, update_at = current_timestamp WHERE IdCliente = $7 AND delete_at IS NULL RETURNING *',
            [Nombre, ApellidoPaterno, ApellidoMaterno, FechaNacimiento, Telefono, IdUsuario, id]
        );
        return result.rows[0];
    }

    static async delete(id) {
        const result = await pool.query(
            'UPDATE clientes SET delete_at = current_timestamp WHERE IdCliente = $1 AND delete_at IS NULL RETURNING *',
            [id]
        );
        return result.rows[0];
    }

    static async searchAllColumns(searchString) {
        const result = await pool.query(
            `SELECT * FROM clientes WHERE 
            Nombre ILIKE $1 OR 
            ApellidoPaterno ILIKE $1 OR 
            ApellidoMaterno ILIKE $1 OR 
            CAST(FechaNacimiento AS TEXT) ILIKE $1 OR 
            CAST(Telefono AS TEXT) ILIKE $1 OR 
            CAST(created_at AS TEXT) ILIKE $1 OR 
            CAST(update_at AS TEXT) ILIKE $1 OR 
            CAST(delete_at AS TEXT) ILIKE $1`,
            [`%${searchString}%`]
        );
        return result.rows;
    }

    static async generarExcel() {
        const result = await pool.query(
            `SELECT Nombre, ApellidoPaterno, ApellidoMaterno, FechaNacimiento, Telefono 
             FROM clientes 
             WHERE delete_at IS NULL`
        );
        return result.rows;
    }

}

module.exports = Cliente;