import { User } from "../models/user.models.js";
import { Project } from "../models/projects.models.js";
import { Task } from "../models/projects.models.js";
import { subTask } from "../models/projects.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import { AvailableUserRole, UserRolesEnum } from "../utils/constants.js";
import mongoose  from "mongoose";

const getTask = asyncHandler(async (req , res) => {
    const {title , description , assignedTo, status} = req.body;
    const {ProjectId} = req.params;

    if(!Project){
        throw new ApiError(404, "Project not found ");
    };

    const tasks = await Task.find({
        project : new mongoose.ObjectId(projectId)
    }).populate("assignedTo", "avatar username fullName");

    return res
       .status(201)
       .json(
        new ApiResponse(201, tasks, "Task fetched successfully!")
    )
});

const createTask = asyncHandler(async (req , res) => {
    const {title , description , assignedTo, status} = req.body;
    const {ProjectId} = req.params;

    const project = await Project.findById(ProjectId);
    if(!ProjectId){
        throw new ApiError(404, "Project not found ");
    }
    const files = req.files || []

    files.map((file) => {
        return {
            url : `${process.env.SERVER_URL}/images/${file.originalname}`,
            mimetype : file.mimetype,
            size : file.size
        }
    })

    const task = await Task.create({
        title,
        description,
        project : new mongoose.Types.ObjectId(projectId),
        assignedTo : assignedTo ? new mongoose.Types.ObjectId(assignedTo) : undefined,
        status,
        assignedBy : new mongoose.Types.ObjectId(req.user._id), attachments
    });

    return res
       .status(201)
       .json(
        new ApiResponse(201, task, "Task created successfully!")
    )
});

const getTaskById = asyncHandler(async (req , res) => {
    
});

const updateTask = asyncHandler(async (req , res) => {
});

const deleteTask = asyncHandler(async (req , res) => {
});

const createSubTask = asyncHandler(async (req , res) => {
});

const updateSubTask = asyncHandler(async (req , res) => {
});

const deleteSubTask = asyncHandler(async (req , res) => {
});

export {
    getTask, createTask,getTaskById,updateTask,deleteTask,createTask,createSubTask,updateSubTask,deleteSubTask
}