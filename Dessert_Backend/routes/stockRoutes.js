const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');
const auth = require('../middlewares/auth');
// const roleMiddleware = require('../middlewares/roleMiddleware'); // Import the role-based middleware
router.use(auth); 
router.get('/', stockController.getStocks);
router.post('/initializeStocks', stockController.initializeStocks);
router.post('/', stockController.addStock);
router.put('/:productId', stockController.updateStock);
router.delete('/:id', stockController.deleteStock);

module.exports = router;

