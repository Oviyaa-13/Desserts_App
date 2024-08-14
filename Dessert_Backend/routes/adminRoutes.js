const express = require('express');
const router = express.Router();
const { getAllOrders, markOrderAsDone} = require('../controllers/adminController');
const auth = require('../middlewares/auth');
const roleMiddleware = require('../middlewares/roleMiddleware'); 
router.get('/orders', auth, roleMiddleware(['admin']), getAllOrders);
router.patch('/orders/:orderId/done', auth, roleMiddleware(['admin']), markOrderAsDone); 

module.exports = router;

