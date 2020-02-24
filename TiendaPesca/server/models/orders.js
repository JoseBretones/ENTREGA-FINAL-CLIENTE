const mongoose = require('mongoose');
const { Schema } = mongoose;
const Product = require('./products');
const Client = require('./users');


const OrdersShema = new Schema ({
   orderNumber: {type:Number , require:true},
   cash: {type:Number , require:true}
   
});

module.exports = mongoose.model('Order', OrdersShema);
