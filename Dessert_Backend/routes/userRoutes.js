const express = require('express');
const Router = express.Router();
const UserController = require('../controllers/userController');
Router.post('/register', UserController.registerUser);
Router.post('/login', UserController.login);
module.exports=Router;
