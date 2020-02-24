const Product = require('../models/products');

const productCtrl = {};

productCtrl.getProducts = async(req,res) =>{
    const products = await Product.find();
    res.json(products);
};
productCtrl.getProductById = async(req,res) =>{
    const product = await Product.findById(req.params.id);
    res.json(product);
};
productCtrl.createProduct = async(req,res) =>{
    const product = new Product({
        name: req.body.name,
        brand: req.body.brand,
        description: req.body.description,
        cash: req.body.cash
    });
    await product.save();
    res.json({
        'status':'Product save'
    });
};
productCtrl.editProduct = async(req,res) =>{
    const { id } = req.params;
    const product = {
        name : req.body.name,
        brand : req.body.brand,
        description : req.body.description,
        cash : req.body.cash
    };
    await Product.findByIdAndUpdate(id,{$set:product}, {new:true});
    res.json({status: "Product update"});
};
productCtrl.deleteProduct = async(req,res) =>{
    await Product.findByIdAndDelete(req.params.id);
    res.json({status:"Product deleted"});
};

module.exports = productCtrl;