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
        loginVerifyToken
    ],
    async (req, res, next) => {
        try {
            if (req.user.role === 'admin') {
                const tasks = await TaskModel.find()
                    .populate({ path: 'employeeId', select: 'avatar' })
                    .populate({ path: 'customerId', select: 'name' });
                res.status(200).send(tasks);
            } else {
                const tasks = await TaskModel.find({ employeeId: { $in: req.user.id } })
                    .populate({ path: 'employeeId', select: 'avatar' })
                    .populate({ path: 'customerId', select: 'name' });
                res.status(200).send(tasks);
            }
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
                .populate('employeeId')
                .populate('customerId')
                .populate({ path: 'comments', populate: 'employeeId' });
            if (!task) {
                res.status(404).send({
                    status: 404,
                    message: 'Task not found'
                });
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
                    status: 404,
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
                start: req.body.start,
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
                status: 201,
                message: 'Handsome!! We have a new job to do'
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
                        status: 404,
                        message: 'Task not found'
                    })
            }
            if (String(searchTask.customerId) !== req.body.customerId) {
                const searchOldCustomer = await CustomerModel.findById(searchTask.customerId);
                searchOldCustomer.task.pull(searchTask._id);
                searchOldCustomer.save();
                const searchNewCustomer = await CustomerModel.findById(req.body.customerId);
                searchNewCustomer.task.push(searchTask._id);
                searchNewCustomer.save();
            }
            let employeesAdded = [];
            let employeesRemoved = [];
            const employeesDb = searchTask.employeeId.map(employee => String(employee));
            req.body.employeeId.forEach(employee => {
                if (!employeesDb.includes(employee)) {
                    employeesAdded.push(employee);
                }
            })
            employeesDb.forEach(employee => {
                if (!req.body.employeeId.includes(employee)) {
                    employeesRemoved.push(employee);
                }
            })
            if (employeesAdded.length > 0) {
                const employeesAtWork = await EmployeeModel.find({ _id: { $in: employeesAdded } });
                employeesAtWork.forEach(employee => {
                    employee.task.push(searchTask._id);
                    employee.save();
                })
            }
            if (employeesRemoved.length > 0) {
                const employeesOutWork = await EmployeeModel.find({ _id: { $in: employeesRemoved } });
                employeesOutWork.forEach(employee => {
                    employee.task.pull(searchTask._id);
                    employee.save();
                })
            }
            const body = {
                employeeId: req.body.employeeId,
                customerId: req.body.customerId,
                title: req.body.title,
                description: req.body.description,
                amount: {
                    total: req.body.amount,
                    invoice: searchTask.amount.invoice
                },
                priority: req.body.priority,
                start: req.body.start,
                end: req.body.end
            }
            await TaskModel.findByIdAndUpdate(id, body);
            res.status(201)
                .send({
                    status: 201,
                    message: 'Task successfully updated to collection'
                });
        } catch (error) {
            next(error);
        }
    })

task.patch('/task/modify/status/:id',
    [
        loginVerifyToken
    ],
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const searchTask = await TaskModel.findById(id);
            if (!searchTask) {
                return res.status(404)
                    .send({
                        status: 404,
                        message: 'Task not found'
                    })
            }
            await TaskModel.findByIdAndUpdate(id, { status: req.body.status });
            res.status(201)
                .send({
                    status: 201,
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
                        status: 404,
                        message: 'Task not found'
                    })
            }
            const searchEmployee = await EmployeeModel.find({ _id: { $in: searchTask.employeeId } })
            const searchCustomer = await CustomerModel.findById(searchTask.customerId);
            searchEmployee.forEach(employee => {
                employee.task.pull(searchTask._id);
                employee.save();
            });
            searchCustomer.task.pull(searchTask._id);
            searchCustomer.save();
            await TaskModel.findByIdAndDelete(id);
            res.status(201)
                .send({
                    status: 201,
                    message: 'Task deleted from database'
                });
        } catch (error) {
            next(error);
        }
    })

module.exports = task;
