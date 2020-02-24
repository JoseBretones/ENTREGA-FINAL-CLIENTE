const Order = require ('../models/orders');
const User = require ('../models/users');

const orderCtrl = {};

orderCtrl.getOrders = async (req,res) => {
    const orders = await Order.find();
    res.json(orders);
};
orderCtrl.getOrder = async (req,res) => {
    const order = await Order.findById(req.params.id);
    res.json(order);
};
orderCtrl.createOrder = async (req,res) => {
    const order = new Order({
        orderNumber: req.body.orderNumber,
        cash: req.body.cash
    });
    await order.save();
    res.json({
        'status' : 'Order save'
    });
};
orderCtrl.editOrder = async (req,res) => {
    const {id} = req.params;
    const order = {
        idProductsList: req.body.idProductsList,
        orderNumber: req.body.orderNumber,
        orderClient: req.body.orderClient,
        sendDirection: req.body.sendDirection
    };
    await Order.findByIdAndUpdate(id,{$set:order},{new : true});
    res.json({status: "Order updated"});
};
orderCtrl.deleteOrder = async (req,res) => {
    await Order.findByIdAndDelete(req.params.id);
    res.json({status:"Order deleted"});
};

module.exports = orderCtrl;