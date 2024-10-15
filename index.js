const express = require('express'); 
const productRoutes = require('./routes/productoRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const empleadoRoutes = require('./routes/empleadoRoutes');
const usuarioRoute = require('./routes/usuarioRoutes');
const rolRoute = require('./routes/rolRoutes');
const tipoProductoRoute = require('./routes/tipoProductoRoutes');
const inventarioRoute = require('./routes/inventarioRoutes');
const ventaRoute = require('./routes/ventaRoutes');
const detalleVentaRoute = require('./routes/detalleVentaRoute');

require('dotenv').config(); 

const app = express(); 
app.use(express.json()); 

// Define rutas
app.use('/api', productRoutes);
app.use('/api', clienteRoutes); 
app.use('/api', empleadoRoutes); 
app.use('/api', usuarioRoute); 
app.use('/api', rolRoute);
app.use('/api', tipoProductoRoute);
app.use('/api', inventarioRoute);
app.use('/api', ventaRoute);
app.use('/api', detalleVentaRoute);

const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => { 
    console.log('Server is running on port ' + PORT); 
});
