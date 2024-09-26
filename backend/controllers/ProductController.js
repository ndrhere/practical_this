const Product = require('../schema/ProductSchema');


exports.getProduct = async (req, res) => {
try{
const product = await Product.find();
res.status(201).json({product})
}catch(error){
    console.error(error)
    res.status(500).send("Internal error occured")
}
}

exports.getProductsByName = async (req, res) => {
    const { name } = req.query;
    try {
        const products = await Product.find({ product_name: { $regex: name, $options: 'i' } });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProductsByQuantity = async (req, res) => {
    const { quantity } = req.query;
    try {
        const products = await Product.find({ products_quantity: quantity });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProductsByPrice = async (req, res) => {
    const { min, max } = req.query;
    try {
        const products = await Product.find({
            price: { $gte: min, $lte: max }
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};