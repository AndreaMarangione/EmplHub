const express = require('express');
const profile = express.Router();
const EmployeeModel = require('../models/employee');
const { profileImageCloudUpload } = require('../cloud/cloud');
const loginVerifyToken = require('../middlewares/loginVerifyToken');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

profile.patch('/profile/image',
    [
        loginVerifyToken,
        profileImageCloudUpload.single('profileImage')
    ],
    async (req, res, next) => {
        const id = req.user.id;
        try {
            const employee = await EmployeeModel.findById(id);
            if (!employee) {
                return res.status(404).send({
                    status: 404,
                    message: 'Employee not found'
                });
            }
            const updatedEmployee = await EmployeeModel.findByIdAndUpdate(id, { avatar: req.file.path }, { new: true });
            const token = jwt.sign({
                id: employee._id,
                name: updatedEmployee.name,
                surname: updatedEmployee.surname,
                email: updatedEmployee.email,
                dateOfBirthday: updatedEmployee.dateOfBirthday,
                avatar: updatedEmployee.avatar,
                role: updatedEmployee.role,
                personalPass: employee.personalPass
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

profile.patch('/profile/password',
    [
        loginVerifyToken
    ],
    async (req, res, next) => {
        const id = req.user.id;
        const password = {
            old: req.body.password,
            new: req.body.newPassword,
            checkNew: req.body.checkNew
        }
        try {
            const employee = await EmployeeModel.findById(id).select('+password');
            if (!employee) {
                return res.status(404).send({
                    status: 404,
                    message: 'Employee not found'
                });
            }
            let validPassword = false;
            if (employee.password !== 'password') {
                const passwordCompare = await bcrypt.compare(password.old, employee.password);
                const newPasswordCompare = await bcrypt.compare(password.new, employee.password);
                validPassword =
                    password.new === password.checkNew
                    && passwordCompare && !newPasswordCompare;
            } else {
                validPassword =
                    password.old === employee.password
                    &&
                    password.new === password.checkNew
                    &&
                    password.old !== password.new;
            }
            if (!validPassword) {
                return res.status(403).send({
                    status: 403,
                    message: 'Wrong password'
                })
            }
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password.new, salt, async function (err, hash) {
                    await EmployeeModel.findByIdAndUpdate(id, { password: hash, personalPass: true });
                    res.status(201).send('Password changed successfully');
                });
            });
        } catch (error) {
            next(error);
        }
    })

module.exports = profile;
