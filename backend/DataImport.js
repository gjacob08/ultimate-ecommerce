import asyncHandler from "express-async-handler";
import Product from "./models/ProductModel.js";
import products from "./data/Products.js";
import User from "./models/UserModel.js";
import express from "express";

const ImportData = express.Router();

const FRONTEND_URL = "http://localhost:3000"

ImportData.post( "/user", asyncHandler( async (req, res) => {

    // Log this request
    console.log( ( new Date() ).toISOString(), req.method, req.baseUrl )

    // Searches the Database for Existing Account
    User.findOne({ 'email' : req.body.email.toLowerCase() }, function(error, user) {
      if( error ) return res.send( error )
      if( user ) return res.redirect( FRONTEND_URL + "/" )
      
      // Creates a new User base on the request body
      else { const user = new User( req.body )
        user.save( function(error) {
          if(error) throw error
          return res.redirect( FRONTEND_URL + "/" )
        })
      }
    })
  })
);

ImportData.post( "/product", asyncHandler(async (req, res) => {
    
    // Log this request
    console.log( ( new Date() ).toISOString(), req.method, req.baseUrl )

    // Searches the Database for Existing Product
    Product.findOne({ 'name' : req.body.name }, function(error, product) {
      if( error ) return res.send( error )
      if( product ) res.redirect( FRONTEND_URL + "/inventory" )
      
      // Creates a new product base on the request body
      else { const product = new Product( req.body )
        product.save( function(error) {
          if(error) throw error
          res.redirect( FRONTEND_URL + "/inventory" )
        })
      }
    })
  })
);

export default ImportData;
