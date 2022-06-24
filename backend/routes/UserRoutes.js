import express from "express";
import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";

    const proxyUsers = [
        {
            "_id": {
            "$oid": "62b1a12973881ec6f1708b8c"
            },
            "name": "Wesuli",
            "email": "wesleymelencion@gmail.com",
            "password": "$2a$10$7OW5Wh88IfWl3Wz36k2UjeYeiKr1LM3VI6s1uN.qCOn9YQngAdst2",
            "photo": "https://avatars.githubusercontent.com/u/57067888?v=4",
            "role": "customer",
            "__v": 0,
            "createdAt": {
            "$date": {
                "$numberLong": "1655808297986"
            }
            },
            "updatedAt": {
            "$date": {
                "$numberLong": "1655808297986"
            }
            }
        },
        {
            "_id": {
            "$oid": "62b1a12973881ec6f1708b8d"
            },
            "name": "Francis",
            "email": "francisaquino@gmail.com",
            "password": "$2a$10$DIf0c4jCA0JdKmcGiI8kQ.mAGS5Z9Nu.PfYdqA4SS1XfZ2B.cI.GW",
            "photo": "https://s3.eu-west-2.amazonaws.com/img.creativepool.com/files/profileimage/91/40/91400b32540f88410f1ce1f67fdb8527_full.jpg",
            "role": "admin",
            "__v": 0,
            "createdAt": {
            "$date": {
                "$numberLong": "1655808297987"
            }
            },
            "updatedAt": {
            "$date": {
                "$numberLong": "1655808297987"
            }
            }
        }
    ]

const userRoute = express.Router()

userRoute.get("/login/success", (req, res) => {
    res.send( false ? proxyUsers[0] : proxyUsers[1] );
    // if (req.user) {
    //   res.status(200).json({
    //     success: true,
    //     message: "successfull",
    //     user: req.user
    //   });
    // }
    // else {
    //   res.status(200).json({
    //     success: true,
    //     message: "successfull",
    //     user: null
    //   });
    // }
});

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

//UPDATE PROFILE
userRoute.put( "/profile/:id", asyncHandler(async (req, res) => {

    // Get Task Id to modify
    const id = req.params.id;

    // Get Data to be modified
    const data = req.body;

    // Execute Update
    User.findOneAndUpdate({ _id: id }, { ...data }, { new: true })
    .then( updatedUser => { res.json({ user: updatedUser }) })
    .catch( error => {
        res.status(500).json({
            'status': 'Error 123',
            'message': 'Error in Database Operation!',
            'error': error
        })
    });
  })
);


export default userRoute;