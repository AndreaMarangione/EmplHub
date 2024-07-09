const express = require('express');
const HolidayModel = require('../models/holiday');
const EmployeeModel = require('../models/employee');
const holiday = express.Router();
const loginVerifyToken = require('../middlewares/loginVerifyToken');
const createHolidayValidation = require('../middlewares/createHolidayValidation');

holiday.get('/holiday',
    [
        loginVerifyToken
    ],
    async (req, res, next) => {
        try {
            const holidays = await HolidayModel.find();
            res.status(200).send(holidays);
        } catch (error) {
            next(error);
        }
    })

holiday.post('/holiday/create',
    [
        loginVerifyToken,
        createHolidayValidation
    ],
    async (req, res, next) => {
        const body = {
            ...req.body,
            employeeId: req.user.id
        }
        try {
            const employee = await EmployeeModel.findById(req.user.id);
            const newHoliday = new HolidayModel(body);
            await newHoliday.save();
            employee.holiday.push(newHoliday._id);
            await employee.save();
            res.status(201).send({
                status: 201,
                message: 'Holiday added to database'
            })
        } catch (error) {
            next(error);
        }
    })

holiday.put('/holiday/modify/:id',
    [
        loginVerifyToken
    ],
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const holiday = await HolidayModel.findById(id);
            if (holiday.employeeId !== req.user.id) {
                return res.status(401).send({
                    status: 401,
                    message: 'Unauthorized to modify this holiday'
                });
            }
            await HolidayModel.findByIdAndUpdate(id, req.body);
            res.status(201).send({
                status: 201,
                message: 'Holiday modified successfully'
            })
        } catch (error) {
            next(error);
        }
    })

holiday.delete('/holiday/delete/:id',
    [
        loginVerifyToken
    ],
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const holiday = await HolidayModel.findById(id);
            if (String(holiday.employeeId) !== req.user.id) {
                return res.status(401).send({
                    status: 401,
                    message: 'Unauthorized to delete this holiday'
                });
            }
            const employee = await EmployeeModel.findById(req.user.id);
            await HolidayModel.findByIdAndDelete(id);
            employee.holiday.pull(holiday._id);
            await employee.save();
            res.status(201).send({
                status: 201,
                message: 'Holiday deleted successfully'
            })
        } catch (error) {
            next(error);
        }
    })

module.exports = holiday;
