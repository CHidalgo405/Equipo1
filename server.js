const express = require('express');
const { Client } = require('pg');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors'); // Añadir cors

const app = express();
const port = 3000;

app.use(cors()); // Usar cors
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const client = new Client({
    host: 'localhost',
    database: 'POWERCLEAN',
    user: 'postgres',
    password: 'kevin11',
    port: 5432
});

client.connect()
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.error('Error al conectar a la base de datos', err));

    
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body); // Para ver los datos recibidos
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await client.query('INSERT INTO USUARIO (NombreUsuario, Correo, password) VALUES ($1, $2, $3)', [username, email, hashedPassword]);
        res.status(200).send('Usuario registrado exitosamente');
    } catch (err) {
        console.error('Error al registrar usuario', err);
        res.status(500).send('Error al registrar usuario: ' + err.message);
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
