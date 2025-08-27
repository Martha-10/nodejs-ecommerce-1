const path = require('path');
require('dotenv').config();

const config = {
    'root': path.join(__dirname, '/../../'),
    'views': path.join(__dirname, '/../views'),
    'controllers': path.join(__dirname, '/../controllers'),
    'sqlCon': {
        host: process.env.DB_HOST,          // Usamos DB_HOST en lugar de DATABASE_HOST
        user: process.env.DB_USERNAME,      // Usamos DB_USERNAME en lugar de DATABASE_USER
        password: process.env.DB_PASSWORD,  // Usamos DB_PASSWORD en lugar de DATABASE_PASS
        database: process.env.DB_DATABASE,  // Usamos DB_DATABASE en lugar de DATABASE_NAME
        charset: 'utf8mb4'
    },
    'populateCon': {
        host: process.env.DB_HOST,          // Usamos DB_HOST en lugar de DATABASE_HOST
        user: process.env.DB_USERNAME,      // Usamos DB_USERNAME en lugar de DATABASE_USER
        password: process.env.DB_PASSWORD,  // Usamos DB_PASSWORD en lugar de DATABASE_PASS
        database: process.env.DB_DATABASE,  // Usamos DB_DATABASE en lugar de DATABASE_NAME
        charset: 'utf8mb4',
        multipleStatements: true
    }
};

module.exports = config;


module.exports = config;