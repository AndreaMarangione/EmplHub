const express = require('express');
const EmployeeModel = require('../models/employee');
const employee = express.Router();

employee.post('/employee/create', async (req, res, next) => {
    const newEmployee = new EmployeeModel({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        dateOfBirthday: req.body.dateOfBirthday,
        role: req.body.role
    })
    try {
        const alreadyExist = await EmployeeModel.findOne({ email: req.body.email })
        if (alreadyExist) {
            return res.status(409)
                .send({
                    statusCode: 409,
                    message: 'This employee already exist'
                })
        }
        await newEmployee.save();
        res.status(201)
            .send({
                statusCode: 201,
                message: 'Employee added to database'
            })
    } catch (error) {
        next(error);
    }
})

module.exports = employee;
