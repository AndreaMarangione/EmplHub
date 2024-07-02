const express = require('express');
const task = express.Router();
const TaskModel = require('../models/task');
const EmployeeModel = require('../models/employee');
const CustomerModel = require('../models/customer');
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
            const tasks = await TaskModel.find()
                .populate({ path: 'employeeId', select: 'avatar' })
                .populate({ path: 'customerId', select: 'name' });
            res.status(200).send(tasks);
        } catch (error) {
            next(error);
        }
    })

task.get('/task/:id',
    [
        loginVerifyToken
    ],
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const task = await TaskModel.findById(id)
                .populate({
                    path: 'employeeId',
                    select: 'name surname email dateOfBirthday avatar createdAt comments task holiday'
                })
                .populate('customerId');
            if (!task) {
                res.status(404).send('Task not found');
            }
            res.status(200).send(task);
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
            const employees = await EmployeeModel.find({
                '_id': { $in: req.body.employeeId }
            })
            const customer = await CustomerModel.findById(req.body.customerId);
            if (!employees || !customer) {
                return res.status(404).send({
                    statusCode: 404,
                    message: 'Employees or customer not found'
                })
            }
            const body = {
                employeeId: req.body.employeeId,
                customerId: req.body.customerId,
                title: req.body.title,
                description: req.body.description,
                amount: {
                    total: req.body.amount,
                    invoice: '0'
                },
                priority: req.body.priority,
                end: req.body.end
            }
            const newTask = new TaskModel(body);
            await newTask.save();
            employees.forEach(async employee => {
                employee.task.push(newTask._id);
                await employee.save();
            })
            customer.task.push(newTask._id);
            await customer.save();
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
