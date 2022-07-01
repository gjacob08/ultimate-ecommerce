import generateToken from "./utils/generateToken.js";
import asyncHandler from "express-async-handler";
import Product from "./models/ProductModel.js";
import User from "./models/UserModel.js";
import express from "express";

const ImportData = express.Router();

const FRONTEND_URL = "http://localhost:3000"

ImportData.post("/user", asyncHandler(async (req, res) => {

  // Log this request
  console.log((new Date()).toISOString(), req.method, req.baseUrl)

  const { firstName, lastName, email, password } = req.body.data;
  console.log(req.body.data)

  // Searches the Database for Existing Account
  User.findOne({ 'email': req.body.data.email.toLowerCase() }, async function (error, user) {
    if (error) return res.send(error)
    if (user) return res.send("User Already Exists")

    // Creates a new User base on the request body
    else {
      const user = new User({
        name: {
          firstName: firstName,
          lastName: lastName,
        },
        email: email,
        password: password,
      })
      user.save(async function (error) {
        if (error) throw error
        const newUser = await User.findOne({ email });

        res.json({
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          token: generateToken(newUser._id),
          createdAt: newUser.createdAt,
        });
      })

      
    }
  })
})
);

ImportData.post("/product", asyncHandler(async (req, res) => {

  // Log this request
  console.log((new Date()).toISOString(), req.method, req.baseUrl)

  // Searches the Database for Existing Product
  Product.findOne({ 'name': req.body.name }, function (error, product) {
    if (error) return res.send(error)
    if (product) res.redirect(FRONTEND_URL + "/inventory")

    // Creates a new product base on the request body
    else {
      const product = new Product(req.body)
      product.save(function (error) {
        if (error) throw error
        res.redirect(FRONTEND_URL + "/inventory")
      })
    }
  })
})
);

export default ImportData;
