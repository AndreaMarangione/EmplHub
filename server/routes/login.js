const express = require('express');
const login = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const EmployeeModel = require('../models/employee');

login.post('/login', async (req, res, next) => {
    const employee = await EmployeeModel.findOne({ email: req.body.email });
    if (!employee) {
        return res.status(404).send({
            status: 404,
            message: 'Employee Not Found'
        })
    }
    try {
        let validPassword = false;
        if (employee.password !== 'password') {
            validPassword = await bcrypt.compare(req.body.password, employee.password);
        } else {
            validPassword = req.body.password === employee.password;
        }
        if (!validPassword) {
            return res.status(403).send({
                status: 403,
                message: 'Email or password not valid'
            })
        }
        const token = jwt.sign({
            id: employee._id,
            name: employee.name,
            surname: employee.surname,
            email: employee.email,
            dateOfBirthday: employee.dateOfBirthday,
            avatar: employee.avatar,
            role: employee.role,
            personalPass: employee.personalPass
        },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '10h'
            })
        res.status(200).json(token);
    } catch (error) {
        next(error);
    }
})

module.exports = login;
