const express = require ('express');
const router = express.Router();
const orderCtrl = require('../controllers/order.controllers');

router.get('/' , orderCtrl.getOrders);
router.post('/', orderCtrl.createOrder);
router.get('/:id', orderCtrl.getOrder);
router.put('/:id', orderCtrl.editOrder);
router.delete('/:id', orderCtrl.deleteOrder);

module.exports = router;