import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },

    created_at:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model('todo',todoSchema)    