const { TaskModel } = require('./../models');
const { validationResult } = require('express-validator');
const { regexString } = require("./../services/common");

module.exports = {
    addTask: async(req, res, next) => {
        try {
            let { title, description, dueDate, order, assigneeId } = req.body;
            const existTask = await TaskModel.findOne({title: regexString(title), isDeleted: false, userId: req.user.id});
            if(existTask) {
                return res.status(200).json({success: false, message: `Task ${title} already exist`})
            }
            if(!assigneeId || assigneeId == null) {
                assigneeId = req.user.id;
            }
            const data = await TaskModel.create({
                title,
                description,
                dueDate,
                order,
                assigneeId,
                userId: req.user.id,
                createdBy: req.user.id,
                updatedBy: req.user.id
            });
            res.status(201).json({
                success: true,
                data,
                message: `Task is created`
            });
        } catch(err) {
            next(err);
        }
    },
    list: async(req, res, next) => {
        try {                            
            let data = await TaskModel.find({$or: [
                { userId: req.user.id },
                { assigneeId: req.user.id }
              ], isDeleted: false});
            return res.status(200).json({
                success: true, 
                data: data
            })           
        }
        catch(err) {
            next(err)
        }
    },
    getTaskById: async(req, res, next) => {
        try {    
            const error = validationResult(req);            
            if(!error.isEmpty()) {
                return res.status(400).json({success: false, error: error.errors})
            } 
            const { taskId } = req.body;                           
            let data = await TaskModel.findOne({_id: taskId, userId: req.user.id});
            return res.status(200).json({
                success: true, 
                data: data
            })           
        }
        catch(err) {
            next(err)
        }
    },
    deleteTask: async(req, res, next) => {
        try {
            const error = validationResult(req);            
            if(!error.isEmpty()) {
                return res.status(200).json({success: false, error: error.errors})
            }
            const { taskId } = req.params; 
            if(taskId == null || taskId == undefined || taskId == 'null') {
                return res.status(200).json({success: false, message: `Please provide task id`});
            }                          
            let data = await TaskModel.updateOne({_id: taskId}, {
                isDeleted: true, 
                deletedBy: req.user.id,
                deletedAt: new Date()
            });
            if(data.modifiedCount == 0) {
                return res.status(200).json({success: false, message: `Failed! Error occured while deleting task`})
            }
            res.status(200).json({
                success: true, 
                data: data,
                message: `Task Deleted`
            })  
        }
        catch(err) {
            next(err)
        }
    }, 
    updateTask: async(req, res, next) => {
        try {
            const error = validationResult(req);            
            if(!error.isEmpty()) {
                return res.status(200).json({success: false, error: error.errors})
            } 
            const { _id, title, description, dueDate, assigneeId } = req.body;
            const checkExistTask = await TaskModel.findOne({
                title: regexString(title), _id: {$nin: _id}
            });
            if(checkExistTask) {
                return res.status(200).json({success: false, message: `Failed! Task already exist`})
            }
            let result = await TaskModel.updateOne({_id: _id}, {
                $set: {
                    title,
                    description,
                    dueDate,
                    assigneeId,
                    updatedBy: req.user.id
                }
            })
            return res.status(200).json({
                success: true, 
                data: result,
                message: `Task Updated`
            })  
        }
        catch(err) {
            next(err)
        }
    },
    moveTask: async(req, res, next) => {
        try {
            const {data, status} = req.body;
            const documentIds = [];
            data.map(item => {
                documentIds.push(item._id);
            });
            const filter = { _id: { $in: documentIds } };
            const updateOption = {
                $set: { status: status },
            };
            const result = await TaskModel.updateMany(filter, updateOption);
            if(result.modifiedCount == 0) {
                return res.status(200).json({success: false, message: `Failed! Error occured while moving task`})
            }
            res.status(200).json({
                success: true, 
                data: result,
                message: `Task Status Updated Successfully`
            })  
        } catch(err) {
            next(err);
        }
    }
}