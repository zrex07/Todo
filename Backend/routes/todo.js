import express from 'express';
import todoModel from '../model/todo.model.js';

const router = express.Router();


const read = async(req, res) =>{
    try{
        const readTodo = await todoModel.find(req.body)
        res.status(200).json(readTodo) 
    }catch(err){
        console.log(err)   
        res.status(500).json({error:'Failed to read todos'}) 
    }
        
}

const add = async(req,res) =>{
    try{
        const addTodo = await todoModel.create(req.body)
        res.status(201).json(addTodo)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Failed to add todo'})   
    }
        
}

const update = async(req,res) =>{
    try{
        const updateTodo = await todoModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json(updateTodo)
    }catch(err){
        console.log(err)   
        res.status(500).json({error:'Failed to update todo'})  
    }
        
}

const remove = async(req,res) =>{
    try{
        const removeTodo = await todoModel.findByIdAndDelete(req.params.id)
        res.status(200).json(removeTodo)
    }catch(err){
        console.log(err)    
        res.status(500).json({error:'Failed to remove todo'})
    }
        
}


router.get('/',read)

router.post('/add',add)

router.put('/update/:id',update)

router.delete('/delete/:id',remove)


export default router;