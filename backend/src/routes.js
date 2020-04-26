const express = require('express');
const productController = require('./controllers/productController')
const UserController = require('./controllers/UserController')
const routes = express.Router();
const login = require('./middlewares/login')

// user routes
routes.post('/register', UserController.create);
routes.get('/register', UserController.index);
routes.post('/login', UserController.login);

// product routes
routes.post('/product', login.required , productController.create);
routes.get('/product/:slug?', productController.index);
routes.delete('/product/:slug?', productController.delete);
// routes.get('/product/:id?', productController.indexById);
// routes.get('/product/:slug?', productController.indexBySlug);

routes.put('/product/:id', login.required , productController.put);
routes.delete('/product', login.required , productController.delete);

module.exports = routes;