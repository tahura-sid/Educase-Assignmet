const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require("jsonwebtoken")
const authMiddleware = require("../middleware/authMiddleware")
const router = express.Router()

//SIGNUP
router.post("/signup", async (req, res)=>{
    try{
        const{
            fullName,
            phoneNumber,
            email,
            password,
            companyName,
            isAgency,
        }= req.body;

        const existingUser = await User.findOne({ email })

        if (existingUser){
            return res.status(400).json({
                message: "User already exists",
            })
        }

        //Hasing the password
        const hashedPassword = await bcrypt.hash(password, 10)

        //Create new user
        const user = new User({
            fullName,
            phoneNumber,
            email,
            password:hashedPassword,
            companyName,
            isAgency,
        })

        //save to the db 
        await user.save()

        res.status(201).json({
            message: "User created successfully",
        })


    } catch(error){
        console.log(error)

        res.status(500).json({
            message:"Server Error"
        })
    }
})

//Login with jwt

router.post("/login", async(req,res)=>{
    try{
        const {email, password} = req.body;
        console.log(req)

        //Find the user
        const user = await User.findOne({ email })

        if (!user){
            return res.status(400).json({
                message: "Invalid Credentials"
            })
        }
        //compare passwords
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                message:"Invalid Credentials"
            })
        }
        //Generate JWT
        const token = jwt.sign(
            {
                userId: user._id,
            },
            process.env.JWT_SECRET,{
                expiresIn: "1d",
            }
        );
        res.status(200).json({
            message: "Login Successful",
            token,
        });

    }catch(error){
        console.log(error)

        res.status(500).json({
            message: "Server Error"
        })
    }
})

//Profile Route
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;