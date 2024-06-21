const express = require('express');
const EmployeeModel = require('../models/employee');
const employee = express.Router();
const loginVerifyToken = require('../middlewares/loginVerifyToken');
const createEmployeeValidation = require('../middlewares/createEmployeeValidation');
const createEmployeeExist = require('../middlewares/createEmployeeExist');
const adminRoleVerify = require('../middlewares/adminRoleVerify');

employee.get('/employee',
    [
        loginVerifyToken
    ],
    async (req, res, next) => {
        try {
            const employees = await EmployeeModel.find();
            res.status(200).send(employees);
        } catch (error) {
            next(error);
        }
    })

employee.get('/employee/:id',
    [
        loginVerifyToken
    ],
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const searchEmployee = await EmployeeModel.findById(id)
                .populate('task')
                .populate('comments')
                .populate('holiday');
            if (!searchEmployee) {
                res.status(404).send('Employee not found');
            }
            res.status(200).send(searchEmployee);
        } catch (error) {
            next(error);
        }
    })

employee.post('/employee/register',
    [
        loginVerifyToken,
        adminRoleVerify,
        createEmployeeValidation,
        createEmployeeExist
    ],
    async (req, res, next) => {
        try {
            const newEmployee = new EmployeeModel(req.body);
            await newEmployee.save();
            res.status(201).send({
                statusCode: 201,
                message: 'Employee added to database'
            })
        } catch (error) {
            next(error);
        }
    })

employee.put('/employee/modify/:id',
    [
        loginVerifyToken,
        adminRoleVerify
    ],
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const searchEmployee = await EmployeeModel.findById(id);
            if (!searchEmployee) {
                return res.status(404)
                    .send({
                        statusCode: 404,
                        message: 'Employee not found'
                    })
            }
            await EmployeeModel.findByIdAndUpdate(id, req.body);
            res.status(201)
                .send({
                    message: 'Employee updated to database'
                });
        } catch (error) {
            next(error);
        }
    })

employee.delete('/employee/delete/:id',
    [
        loginVerifyToken,
        adminRoleVerify
    ],
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const searchEmployee = await EmployeeModel.findById(id);
            if (!searchEmployee) {
                return res.status(404)
                    .send({
                        statusCode: 404,
                        message: 'Employee not found'
                    })
            }
            await EmployeeModel.findByIdAndDelete(id);
            res.status(201)
                .send({
                    message: 'Employee deleted from database'
                });
        } catch (error) {
            next(error);
        }
    })

module.exports = employee;
