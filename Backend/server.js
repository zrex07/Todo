import express from 'express';
import cors from 'cors';
import todo from './routes/todo.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';


dotenv.config();

    

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/todos',todo)


mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log(`MongoDB connected`))
    .catch((err)=>{
        console.log(`Connection error`)
        console.log(err)
    })


app.get('/',(req, res)=>{
    res.send("hello world")
})


app.listen(port, ()=>{
    console.log(`Server is listening on ${port}`)
})