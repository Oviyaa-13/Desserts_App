const express = require('express');
const { addOrder, getOrder, getAllOrders, markOrderAsDone } = require('../controllers/orderController');
const auth = require('../middlewares/auth');
const roleMiddleware = require('../middlewares/roleMiddleware'); 
const router = express.Router();
router.post('/checkout', auth, addOrder);
router.get('/order', auth, roleMiddleware(['user']), getOrder); 
router.patch('/:orderId/done', auth, roleMiddleware(['admin']), markOrderAsDone);
module.exports = router;
