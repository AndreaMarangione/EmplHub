const express = require('express');
const TaskCommentModel = require('../models/taskComments');
const TaskModel = require('../models/task');
const EmployeeModel = require('../models/employee');
const comment = express.Router();
const loginVerifyToken = require('../middlewares/loginVerifyToken');
const createCommentValidation = require('../middlewares/createCommentValidation');

comment.get('/task/comment/:id',
    [
        loginVerifyToken
    ],
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const comment = await TaskCommentModel.findById(id).select('comment');
            if (!comment) {
                res.status(404).send({
                    status: 404,
                    message: 'Comment not found'
                });
            }
            res.status(200).send(comment);
        } catch (error) {
            next(error);
        }
    })

comment.post('/task/comment/create',
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
                comment: req.body.comment
            }
            const newComment = new TaskCommentModel(body);
            await newComment.save();
            employee.comments.push(newComment._id);
            await employee.save();
            task.comments.push(newComment._id);
            await task.save();
            res.status(201).send({
                status: 201,
                message: 'Comment added to this task'
            })
        } catch (error) {
            next(error);
        }
    })

comment.patch('/task/comment/modify/:id',
    [
        loginVerifyToken
    ],
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const comment = await TaskCommentModel.findById(id);
            if (!comment) {
                return res.status(404).send('Comment not found');
            }
            if (String(comment.employeeId) !== req.user.id) {
                return res.status(401).send('Unauthorized to modify this comment');
            }
            await TaskCommentModel.findByIdAndUpdate(id, { comment: req.body.comment });
            res.status(201).send({
                status: 201,
                message: 'Comment modified successfully'
            })
        } catch (error) {
            next(error);
        }
    })

comment.delete('/task/comment/delete/:id',
    [
        loginVerifyToken
    ],
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const comment = await TaskCommentModel.findById(id);
            if (String(comment.employeeId) !== req.user.id) {
                return res.status(401).send('Unauthorized to delete this comment');
            }
            const employee = await EmployeeModel.findById(comment.employeeId);
            employee.comments.pull(comment._id);
            employee.save();
            const task = await TaskModel.findById(comment.taskId);
            task.comments.pull(comment._id);
            task.save();
            await TaskCommentModel.findByIdAndDelete(id);
            res.status(201).send({
                status: 201,
                message: 'Comment deleted successfully'
            })
        } catch (error) {
            next(error);
        }
    })

module.exports = comment;
