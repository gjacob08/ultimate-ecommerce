import express from "express";
import asyncHandler from "express-async-handler";
import protect from "../Middleware/AuthMiddleware.js";
import User from "../models/UserModel.js";
import generateToken from "../utils/generateToken.js";

const userRoute = express.Router();

// SUCCESSFUL LOGIN GIVES BACK THE USER DATA
userRoute.get("/login/success", protect, asyncHandler(async (req, res) => {
    res.send( req.user );
}));

// GET ALL USERS
userRoute.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
  })
);

// LOGIN
userRoute.post( "/login", asyncHandler(async (req, res) => {

    // Log this request
    console.log( ( new Date() ).toISOString(), req.method, req.baseUrl )

    const { email, password } = req.body.data;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
        createdAt: user.createdAt,
      });
    } else {
      res.status(401).send("Invalid Email or Password");
    }
  })
);

// GET SINGLE USER
userRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error("User Not Found");
    }
  })
);

// PROFILE
userRoute.get(
  "/profile/:id",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// UPDATE PROFILE
userRoute.put(
  "/profile/:id",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
      if (req.body.password) {
        user.password = req.body.password || user.password;
      }
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        createdAt: updatedUser.createdAt,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// REGISTER
userRoute.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  })
);

export default userRoute;
