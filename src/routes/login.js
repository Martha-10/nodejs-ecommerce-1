// ----------------------------
// IMPORTACIONES
// ----------------------------
const express = require("express");
const router = express.Router();
const UsersController = require('../controllers/users.js');
const User = new UsersController();
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
require('dotenv').config();
const config = require('../config/app-config.js');

// ----------------------------
// SESIONES
// ----------------------------
const sessionStore = new MySQLStore(config.sqlCon);

router.use(session({
    name: process.env.SESSION_NAME,
    key: process.env.SESSION_KEY,
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

router.use(passport.initialize());
router.use(passport.session());

// ----------------------------
// BODY PARSER, COOKIES, CSRF, FLASH
// ----------------------------
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser());
router.use(csurf({ cookie: true }));
router.use(flash());

// ----------------------------
// MIDDLEWARES DE AUTENTICACIÓN
// ----------------------------
function notAuthenticated() {
    return (req, res, next) => {
        if (!req.isAuthenticated()) return next();
        res.redirect('/hamburguers'); // si ya está logueado
    }
}

function isAuthenticated() {
    return (req, res, next) => {
        if (req.isAuthenticated()) return next();
        res.redirect('/login'); // si NO está logueado
    }
}

// ----------------------------
// PASSPORT LOCAL STRATEGY
// ----------------------------
passport.use('local', new LocalStrategy(async function(email, password, done) {
    let user;
    try {
        user = await User.getUserByEmail(email);
        if (!user) return done(null, false, { message: 'No user with that email' });
    } catch (e) {
        return done(e);
    }

    try {
        if (await bcrypt.compare(password, user.password)) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Password incorrect' });
        }
    } catch (e) {
        return done(e);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        let user = await User.getUserById(id);
        done(null, user);
    } catch (e) {
        done(e);
    }
});

// ----------------------------
// RUTAS PÚBLICAS
// ----------------------------
router.get("/", notAuthenticated(), (req, res) => {
    res.render(`${config.views}/public/login.ejs`, { csrfToken: req.csrfToken() });
});

router.post("/", passport.authenticate('local', {
    successRedirect: '/hamburguers',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get("/register", notAuthenticated(), (req, res) => {
    res.render(`${config.views}/public/register.ejs`, { csrfToken: req.csrfToken() });
});

router.post("/register", notAuthenticated(), async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const userData = { name: req.body.name, email: req.body.username, password: hashedPassword };
        await User.save(userData);
        res.redirect('/login');
    } catch {
        res.redirect('/register');
    }
});

// ----------------------------
// RUTAS PRIVADAS
// ----------------------------
router.get("/profile", isAuthenticated(), async (req, res) => {
    try {
        let user = await User.getUserById(req.session.passport.user);
        res.render(`${config.views}/public/profile.ejs`, { user, msg: req.query.success, csrfToken: req.csrfToken() });
    } catch (e) {
        res.redirect('/login');
    }
});

router.post("/profile", isAuthenticated(), async (req, res) => {
    try {
        const userId = req.session.passport.user;
        await User.update(req.body.name, req.body.email, userId);

        if (req.body.password !== "") {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            await User.updatePassword(hashedPassword, userId);
        }

        res.redirect('/login/profile?success=true');
    } catch (e) {
        res.redirect('/login/profile?success=false');
    }
});

router.get("/reset", isAuthenticated(), async (req, res) => {
    res.render(`${config.views}/public/reset.ejs`, { msg: req.query.success, csrfToken: req.csrfToken() });
});

// ----------------------------
// LOGOUT SEGURO
// ----------------------------
router.get("/logout", async (req, res, next) => {
    try {
        // Passport 0.6+ soporta logout async si no pones callback
        await req.logout();  

        // destruye sesión con callback seguro
        req.session.destroy(err => {
            if (err) return next(err);
            res.clearCookie(process.env.SESSION_NAME); // limpia cookie
            res.redirect('/login');
        });

    } catch (err) {
        next(err);
    }
});


// ----------------------------
// EXPORTAR ROUTER
// ----------------------------
module.exports = router;
