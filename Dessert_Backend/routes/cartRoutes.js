const express = require("express")
const Router = express.Router();
const cartController = require("../controllers/cartController")
const auth =require('../middlewares/auth')

Router.post("/addCart",auth,cartController.addCart)
Router.get("/getCart",auth,cartController.getCart)
Router.delete("/deleteCart",auth,cartController.deleteCart)
Router.delete("/deleteproduct/:id",auth,cartController.deleteproduct)

module.exports = Router;