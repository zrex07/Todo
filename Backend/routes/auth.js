import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import User from "../model/user-model"
import e from "express";

const router = express.Router()

router.post("/register", async(req, res)=>{
    
    try{
        const {name, email, password} = req.body;

    const existingUser = await User.findOne({email});

    if(existingUser){
        return res.status(400).json({message: "User already exist"})
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        name, 
        email,
        password: hashPassword
    })

    res.status(201).json({message: "User registered sucessfully"})
    }catch(error){
        res.status(500).json({error: error.message})
    }
    
})

export default router;

router.post("/login", async(req, res)=>{
    try{
        const {email, password} = req.body;

        if(!user){
            return res.status(400).json({message: "Invalid credentials"})
        }

        const isMatched = await bcrypt.compare(password, user.password);

        if(!isMatched){
            return res.status(400).json({message: "Invalid credentials"})
        }

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        );

        res.json({
            token,  
            user:{  
                id: user._id,
                name: user.name,
                email: user.email
            }
        })

    }catch(error){
        res.status(500).json({error: error.message})
    }   
})