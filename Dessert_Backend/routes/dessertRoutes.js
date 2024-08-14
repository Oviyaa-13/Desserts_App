const express=require('express');
const Router=express.Router();
const dessertController = require('../controllers/dessertController');
const auth = require('../middlewares/auth');

Router.get("/desserts",dessertController.getAllDesserts);
Router.post("/desserts",auth,dessertController.postDessert);
Router.put("/desserts/:productId",dessertController.updateDessert);
Router.delete("/desserts/:productId",dessertController.deleteDessert);
module.exports=Router;
