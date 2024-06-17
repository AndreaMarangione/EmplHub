const express = require('express');
const profile = express.Router();
const EmployeeModel = require('../models/employee');
const profileImageCloudUpload = require('../cloud/cloud');
const loginVerifyToken = require('../middlewares/loginVerifyToken');

profile.patch('/profile/image',
    [
        loginVerifyToken,
        profileImageCloudUpload.single('profileImage')
    ],
    async (req, res, next) => {
        try {
            const employee = await EmployeeModel.findOne({ email: req.user.email })
            if (!employee) {
                return res.status(404).send('Ops something went wrong');
            }
            const id = employee._id.toString();
            await EmployeeModel.findByIdAndUpdate(id, { avatar: req.file.path });
            res.status(201).send('Image updated');
        } catch (error) {
            next(error);
        }
    })

module.exports = profile;
