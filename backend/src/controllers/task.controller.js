import Tasks from "../models/task.models.js";
import mongoose from "mongoose"
export const createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTask = await Tasks.create({ title, description });
    if (!newTask)
      return res
        .status(400)
        .json({ success: false, message: "Task creation failed" });
    res
      .status(201)
      .json({ success: true, message: `Task Created `, data: newTask });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const getTasks = async (req, res) => {
  try {
    const allTasks = await Tasks.find().sort({ createdAt: -1 });
    if (!allTasks)
      return res
        .status(404)
        .json({ success: false, message: "No Tasks found" });
    res.status(200).json({ success: true, data: allTasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const getById = await Tasks.findById(id);
    if (!getById)
      return res
        .status(404)
        .json({ success: false, message: `Task note found` });
    res.status(200).json(getById);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};


export const updateTask = async (req,res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    return res.status(400).json({ error: 'Invalid task ID' })
  }
  try {
    const id= req.params.id
    const task = await Tasks.findByIdAndUpdate(id,req.body,{new:true})
    if(!task)return res.status(404).json({success:false , message:`Task Not Found`})
      res.json({data:task})
  } catch (error) {
      res.status(500).json({ message: error.message });
    console.log(error);
  }
}


export const deleteTask = async (req,res) =>{
  try {
    const id =req.params.id
    const deleted = await Tasks.findByIdAndDelete(id);
    if(!deleted)return res.status(400).json({message:`Error deleting the task`});
    res.status(200).json({success:true,message:`Task has been deleted`})
  } catch (error) {
    console.log(error.message);
    res.status(500).json({Error:error.message})
    
  }
}