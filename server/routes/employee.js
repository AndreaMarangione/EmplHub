const express = require('express');
const EmployeeModel = require('../models/employee');
const employee = express.Router();
const createEmployeeValidation = require('../middlewares/createEmployeeValidation');
const createEmployeeExist = require('../middlewares/createEmployeeExist');

employee.post('/register/employee',
    [
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

module.exports = employee;
