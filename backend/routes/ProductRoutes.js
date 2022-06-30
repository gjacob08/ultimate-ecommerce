import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../models/ProductModel.js";

const productRoute = express.Router()

const FRONTEND_URL = "http://localhost:3000"

// GET ALL PRODUCTS
productRoute.get("/",  asyncHandler(
    async(req, res) => {
        const products = await Product.find()
        res.json(products);
    })
);

// GET A PRODUCT
productRoute.get("/:id",  asyncHandler(
    async(req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) res.json(product);
        else {
            res.status(404)
            throw new Error("Product Not Found")
        }
    })
);

// UPDATE A PRODUCT
productRoute.post("/:id",  asyncHandler( async(req, res) => {

    // Log this request
    console.log( (new Date()).toISOString(), req.method, req.baseUrl );

    // Get Product ID to Modify
    const productId = req.params.id;

    // Get Data to be modified
    const data = req.body;

    // Execute Update
    Product.findOneAndUpdate({ _id: productId }, { ...data, 'timestamps.modifiedOn': Date.now() }, { new: true })
        .then( updatedProduct => { return res.redirect(FRONTEND_URL + "/inventory") })
        .catch( error => {
            res.status(500).json({
                'status': 'Error',
                'message': 'Error in Database Operation!',
                'error': error
            })
        });
    })
);

// DELETE A PRODUCT
productRoute.get("/delete/:id",  asyncHandler( async(req, res) => {

    // Log this request
    console.log( (new Date()).toISOString(), req.method, req.baseUrl );

    // Get Product ID to Delete
    const productId = req.params.id;

    // Execute Update
    Product.findOneAndDelete({ _id: productId })
        .then( deletedProduct => { return res.redirect(FRONTEND_URL + "/inventory") })
        .catch( error => {
            res.status(500).json({
                'status': 'Error',
                'message': 'Error in Database Operation!',
                'error': error
            })
        });
    })
);

export default productRoute;