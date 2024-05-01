const Product = require('../model/productModel');
const app = require('./../app');

exports.getProducts = async function(req, res, next) {
    try {
        const products = await Product.find();
        console.log(products)

        res.status(200).json({
            status: 'success',
            count: products.length,
            data: {
                products
            }
        });

    } catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
};


exports.createProduct = async function(req, res) {
    try {

        const createdProduct = await Product.create({
            name: req.body.name,
            image: req.body.image,
            description: req.body.description,
            price: req.body.price
        });


        res.status(200).json({
            status: 'success',
            message: 'Product was created successfully',
            data: {
                product: createdProduct
            }
        });

    } catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
};


exports.getProductById = async function(req, res) {
    try {
        const id = req.params.id
        // console.log(req.params, req.params.id)
        // { id: hdbdhu3wehdeidscjjdcnxsdjjsd }
        const product = await Product.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                product 
            }
        })

    } catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
};


exports.updateProduct = async function(req, res) {
    try {

        console.log(req.params.id)
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true, new: true
        });

        console.log(req.body)

        res.status(200).json({
            status: 'success',
            message: 'Update successful',
            data: {
                product: updatedProduct
            }
        })

    } catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
};


exports.deleteProduct = async function(req, res) {
    try {
        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: 'success',
            message: 'Product deleted!',
            data: null
        })

    } catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}



