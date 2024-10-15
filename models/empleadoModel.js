const pool = require('../config/db');

class Empleado {
    static async findAll() { // Lista de todos los empleados
        const result = await pool.query('SELECT * FROM empleados WHERE delete_at IS NULL');
        return result.rows;
    }

    static async create(data) {
        const { 
            Nombre, 
            ApellidoPaterno, 
            ApellidoMaterno, 
            FechaNacimiento, 
            Telefono, 
            RFC, 
            NSS, 
            IdUsuario, 
            IdRol 
        } = data;
    
        if (!Nombre) {
            throw new Error("El campo Nombre no puede estar vacío");
        }
    
        const result = await pool.query(
            `INSERT INTO empleados 
             (Nombre, ApellidoPaterno, ApellidoMaterno, FechaNacimiento, Telefono, RFC, NSS, IdUsuario, IdRol, created_at) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, current_timestamp) 
             RETURNING *`,
            [Nombre, ApellidoPaterno, ApellidoMaterno, FechaNacimiento, Telefono, RFC, NSS, IdUsuario, IdRol]
        );
        return result.rows[0];
    }
    
    
    static async findById(id) {
        const result = await pool.query('SELECT * FROM empleados WHERE IdEmpleado = $1 AND delete_at IS NULL', [id]);
        return result.rows[0];
    }

    static async update(id, data) {
        const { 
            Nombre, 
            ApellidoPaterno, 
            ApellidoMaterno, 
            Telefono, 
            RFC, 
            FechaNacimiento, 
            NSS, 
            IdUsuario, 
            IdRol 
        } = data;
    
        const result = await pool.query(
            `UPDATE empleados 
             SET Nombre = $1, 
                 ApellidoPaterno = $2, 
                 ApellidoMaterno = $3, 
                 Telefono = $4, 
                 RFC = $5, 
                 FechaNacimiento = $6, 
                 NSS = $7, 
                 IdUsuario = $8, 
                 IdRol = $9, 
                 update_at = current_timestamp 
             WHERE IdEmpleado = $10 AND delete_at IS NULL 
             RETURNING *`,
            [Nombre, ApellidoPaterno, ApellidoMaterno, Telefono, RFC, FechaNacimiento, NSS, IdUsuario, IdRol, id]
        );
        return result.rows[0];
    }
    

    static async delete(id) {
        const result = await pool.query(
            'UPDATE empleados SET delete_at = current_timestamp WHERE IdEmpleado = $1 AND delete_at IS NULL RETURNING *',
            [id]
        );
        return result.rows[0];
    }

    static async searchAllColumns(searchString) {
        const result = await pool.query(
            `SELECT * FROM empleados WHERE 
            Nombre ILIKE $1 OR 
            ApellidoPaterno ILIKE $1 OR 
            ApellidoMaterno ILIKE $1 OR 
            CAST(Telefono AS TEXT) ILIKE $1 OR 
            RFC ILIKE $1 OR 
            CAST(FechaNacimiento AS TEXT) ILIKE $1 OR 
            CAST(NSS AS TEXT) ILIKE $1`,
            [`%${searchString}%`]
        );
        return result.rows;
    }

    static async generarExcel() {
        const result = await pool.query(
            `SELECT Nombre, ApellidoPaterno, ApellidoMaterno, Telefono, RFC, FechaNacimiento, NSS 
             FROM empleados 
             WHERE delete_at IS NULL`
        );
        return result.rows;
    }
}

module.exports = Empleado;
