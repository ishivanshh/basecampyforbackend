import mongoose, { mongo, Schema } from "mongoose";

const subTaskSchema = new Schema({
    title : {
        type : String,
        required : true,
        trime : true
    }, 
    task : {
        type : Schema.Types.ObjectId,
        ref : "Task",
        required : true
    },
    isCompleted : {
        type : Boolean,
        default : false
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
}, {timestamps : true})

export const Subtask = mongoose.model("subtask", subTaskSchema);