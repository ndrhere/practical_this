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


exports.getFilteredProducts = async (req, res) => {
    const { name, minPrice, maxPrice, quantity, startDate, endDate } = req.query;
    const filters = {};

    if (name) {
        filters.product_name = { $regex: name, $options: 'i' }; 
    }
    if (quantity) {
        filters.product_quantity = quantity;
    }
    if (minPrice || maxPrice) {
        filters.price = {};
        if (minPrice) filters.price.$gte = minPrice;
        if (maxPrice) filters.price.$lte = maxPrice;
    }
    if (startDate && endDate) {
        filters.created_date = {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
        };
    }

    try {
        const products = await Product.find(filters);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



