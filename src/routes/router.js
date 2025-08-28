// config variables
const config = require('../config/app-config.js');

// express initialization
const express = require("express");
const app = express();

// Eliminar motor de vistas, solo HTML y archivos estáticos

// required libraries
require('dotenv').config();
const helmet = require('helmet')
app.use(helmet())

// static folders
app.use(express.static(config.root + '/public'));
app.use(express.static(config.root + '/views'));

// routes
app.use('/', require('./main.js'))
app.use('/login', require('./login.js'))
app.use('/dashboard', require('./dashboard.js'))
app.use('/ajax', require('./ajax.js'))

// server initialization
// app.listen(process.env.APP_PORT, () => console.log('Server is running'));
const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

