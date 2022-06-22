import express from "express";
import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";

const userRoute = express.Router()

// GET ALL USERS
userRoute.get("/",  asyncHandler(
    async(req, res) => {
        const users = await User.find({})
        res.json(users);
    })
);

// GET SINGLE USER
userRoute.get("/:id",  asyncHandler(
    async(req, res) => {
        const user = await User.findById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404)
            throw new Error("User Not Found")
        }
        
    })
);


export default userRoute;