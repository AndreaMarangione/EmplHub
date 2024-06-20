const express = require('express');
const EmployeeModel = require('../models/employee');
const employee = express.Router();
const loginVerifyToken = require('../middlewares/loginVerifyToken');
const createEmployeeValidation = require('../middlewares/createEmployeeValidation');
const createEmployeeExist = require('../middlewares/createEmployeeExist');

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

employee.post('/employee/register',
    [
        loginVerifyToken,
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

employee.patch('/employee/modify/:id',
    [
        loginVerifyToken
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
            await searchEmployee.findByIdAndUpdate(id, req.body);
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
        loginVerifyToken
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
            await searchEmployee.findByIdAndDelete(id);
            res.status(201)
                .send({
                    message: 'Employee deleted from database'
                });
        } catch (error) {
            next(error);
        }
    })

module.exports = employee;
