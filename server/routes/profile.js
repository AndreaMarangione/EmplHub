const express = require('express');
const profile = express.Router();
const EmployeeModel = require('../models/employee');
const profileImageCloudUpload = require('../cloud/cloud');
const loginVerifyToken = require('../middlewares/loginVerifyToken');
const jwt = require('jsonwebtoken');

profile.patch('/profile/image',
    [
        loginVerifyToken,
        profileImageCloudUpload.single('profileImage')
    ],
    async (req, res, next) => {
        try {
            const employee = await EmployeeModel.findOne({ email: req.user.email });
            if (!employee) {
                return res.status(404).send('Ops something went wrong');
            }
            const id = employee._id.toString();
            await EmployeeModel.findByIdAndUpdate(id, { avatar: req.file.path });
            const updatedEmployee = await EmployeeModel.findById(id);
            const token = jwt.sign({
                name: updatedEmployee.name,
                surname: updatedEmployee.surname,
                email: updatedEmployee.email,
                dateOfBirthday: updatedEmployee.dateOfBirthday,
                avatar: updatedEmployee.avatar,
                role: updatedEmployee.role
            },
                process.env.JWT_SECRET_KEY,
                {
                    expiresIn: '1h'
                })
            res.status(201).json(token);
        } catch (error) {
            next(error);
        }
    })

module.exports = profile;
