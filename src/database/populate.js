var fs = require('fs');
const path = require('path');
const mysql = require('mysql2');
const config = require('../config/app-config.js');

var users = fs.readFileSync(path.join(__dirname , 'users.sql')).toString();
var products = fs.readFileSync(path.join(__dirname , 'products.sql')).toString();
var cart = fs.readFileSync(path.join(__dirname , 'cart.sql')).toString();
var orders = fs.readFileSync(path.join(__dirname , 'orders.sql')).toString();
var ordersItems = fs.readFileSync(path.join(__dirname , 'ordersItems.sql')).toString();

con = mysql.createConnection(config.populateCon);

populateDb(users).then( () => { console.log('Users table create!') });
populateDb(products).then( () => { console.log('Products table create!') });
populateDb(cart).then( () => { console.log('Cart table create!') });
populateDb(orders).then( () => { console.log('Orders table create!') });
populateDb(ordersItems).then( () => { console.log('Orders_items table create!') });

function populateDb(file) {
    return new Promise((resolve,reject) => {
        con.query(file, function (err, result) {
            if(err) {
                reject(new Error(err))
            } else {
                resolve();
            }
        });
    });
}