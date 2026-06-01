import mongoose from "mongoose"

const TaskSchema = new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    completed:{type:Boolean,default:false}

},{timestamps:true});

const Tasks = mongoose.model("Tasks",TaskSchema);

export default Tasks