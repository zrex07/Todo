import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import User from "../model/user-model"

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