const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductsShema = new Schema ({
    name: {type:String, require:true},
    brand: {type:String, require:true},
    description: {type:String, require:false},
    cash: {type:Number, require:true}
});

module.exports = mongoose.model('Product', ProductsShema);