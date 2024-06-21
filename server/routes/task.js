const express = require('express');
const task = express.Router();
const TaskModel = require('../models/task');
const loginVerifyToken = require('../middlewares/loginVerifyToken');
const createTaskValidation = require('../middlewares/createTaskValidation');
const adminRoleVerify = require('../middlewares/adminRoleVerify');

task.get('/task',
    [
        loginVerifyToken,
        adminRoleVerify
    ],
    async (req, res, next) => {
        try {
            const tasks = await TaskModel.find();
            res.status(200).send(tasks);
        } catch (error) {
            next(error);
        }
    })

task.post('/task/create',
    [
        loginVerifyToken,
        adminRoleVerify,
        createTaskValidation
    ],
    async (req, res, next) => {
        try {
            const newTask = new TaskModel(req.body);
            await newTask.save();
            res.status(201).send({
                statusCode: 201,
                message: 'Task added to database'
            })
        } catch (error) {
            next(error);
        }
    })

task.put('/task/modify/:id',
    [
        loginVerifyToken,
        adminRoleVerify
    ],
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const searchTask = await TaskModel.findById(id);
            if (!searchTask) {
                return res.status(404)
                    .send({
                        statusCode: 404,
                        message: 'Task not found'
                    })
            }
            await TaskModel.findByIdAndUpdate(id, req.body);
            res.status(201)
                .send({
                    message: 'Task updated to database'
                });
        } catch (error) {
            next(error);
        }
    })

task.delete('/task/delete/:id',
    [
        loginVerifyToken,
        adminRoleVerify
    ],
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const searchTask = await TaskModel.findById(id);
            if (!searchTask) {
                return res.status(404)
                    .send({
                        statusCode: 404,
                        message: 'Task not found'
                    })
            }
            await TaskModel.findByIdAndDelete(id);
            res.status(201)
                .send({
                    message: 'Task deleted from database'
                });
        } catch (error) {
            next(error);
        }
    })

module.exports = task;
