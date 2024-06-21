const express = require('express');
const TaskCommentModel = require('../models/taskComments');
const TaskModel = require('../models/task');
const EmployeeModel = require('../models/employee');
const comment = express.Router();
const loginVerifyToken = require('../middlewares/loginVerifyToken');
const createCommentValidation = require('../middlewares/createCommentValidation');

comment.post('/comment/create',
    [
        loginVerifyToken,
        createCommentValidation
    ],
    async (req, res, next) => {
        try {
            const task = await TaskModel.findById(req.body.taskId);
            const employee = await EmployeeModel.findById(req.user.id);
            const body = {
                employeeId: req.user.id,
                taskId: task._id,
                comment: req.body
            }
            const newComment = new TaskCommentModel(body);
            await newComment.save();
            employee.comments.push(newComment._id);
            await employee.save();
            console.log(body);
            res.status(201).send({
                statusCode: 201,
                message: 'Comment added to this task'
            })
        } catch (error) {
            next(error);
        }
    })

comment.put('/comment/modify/:id',
    [
        loginVerifyToken
    ],
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const comment = await TaskCommentModel.findById(id);
            if (comment.employeeId !== req.user.id) {
                return res.status(401).send('Unauthorized to modify this comment');
            }
            await TaskCommentModel.findByIdAndUpdate(id, req.body);
            res.status(201).send({
                statusCode: 201,
                message: 'Comment modified successfully'
            })
        } catch (error) {
            next(error);
        }
    })

comment.delete('/comment/delete/:id',
    [
        loginVerifyToken
    ],
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const comment = await TaskCommentModel.findById(id);
            if (comment.employeeId !== req.user.id) {
                return res.status(401).send('Unauthorized to delete this comment');
            }
            await TaskCommentModel.findByIdAndDelete(id);
            res.status(201).send({
                statusCode: 201,
                message: 'Comment deleted successfully'
            })
        } catch (error) {
            next(error);
        }
    })

module.exports = comment;
