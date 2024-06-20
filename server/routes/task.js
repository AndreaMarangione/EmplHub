const express = require('express');
const task = express.Router();
const TaskModel = require('../models/task');
const loginVerifyToken = require('../middlewares/loginVerifyToken');
const createTaskValidation = require('../middlewares/createTaskValidation');

task.get('/task',
    [
        loginVerifyToken
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
