// express initialization
const express = require("express");
const path = require("path");
const router = express.Router();
const config = require('../config/app-config.js');

// required libraries
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator');

// global middleware
router.use(session({
    name: process.env.SESSION_NAME,
    key: process.env.SESSION_KEY,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

router.use(passport.initialize());
router.use(passport.session());

router.use(async function(req,res,next) {
    const UsersController = require('../controllers/users.js');
    const User = new UsersController();

    res.locals.isAuthenticated = req.isAuthenticated();

    try {
        res.locals.isAdmin = await User.isAdmin(req.session.passport.user);
    } catch {
        res.locals.isAdmin = false;
    }

    next();
});

// Index page
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/index.html'));
});

// Products page
router.get("/hamburguers", async (req, res) => {
    // Si necesitas pasar datos, deberás usar AJAX/fetch desde el frontend
    res.sendFile(path.join(__dirname, '../../views/src/pages/view_stores.html'));
});

// Product order page
router.get("/order", authenticate(), async (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/src/pages/view_customer.html'));
});

// Ruta para mostrar el carrito
router.get("/cart", authenticate(), async (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/cart.html'));
});
// cart page
router.get("/cart", authenticate(), async (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/src/pages/view_admin.html'));
});

// checkout process
router.get("/checkout", authenticate(), async (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/src/pages/view_seller.html'));
});

// checkout order
router.post("/checkout", authenticate(), async (req, res) => {
    // Aquí deberías procesar el pedido y luego redirigir o mostrar una página de confirmación
    res.sendFile(path.join(__dirname, '../../views/src/pages/view_seller.html'));
});

// contact page
router.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/src/pages/login.html'));
});

// auth verify middleware
function authenticate () {
	return (req, res, next) => {
	    if (req.isAuthenticated()) return next();
	    res.redirect('/login')
	}
}

module.exports = router;
