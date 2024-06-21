const express = require('express');
const CustomerModel = require('../models/customer');
const customer = express.Router();
const loginVerifyToken = require('../middlewares/loginVerifyToken');
const { customerImageCloudUpload } = require('../cloud/cloud');
const createCustomerValidation = require('../middlewares/createCustomerValidation');
const createCustomerExist = require('../middlewares/createCustomerExist');
const adminRoleVerify = require('../middlewares/adminRoleVerify');

customer.get('/customer',
    [
        loginVerifyToken
    ],
    async (req, res, next) => {
        try {
            const customers = await CustomerModel.find();
            res.status(200).send(customers);
        } catch (error) {
            next(error);
        }
    })

customer.post('/customer/register',
    [
        loginVerifyToken,
        adminRoleVerify,
        createCustomerValidation,
        createCustomerExist,
        customerImageCloudUpload.single('')
    ],
    async (req, res, next) => {
        try {
            const newCustomer = new CustomerModel(req.body);
            await newCustomer.save();
            res.status(201).send({
                statusCode: 201,
                message: 'Customer added to database'
            })
        } catch (error) {
            next(error);
        }
    })

customer.put('/customer/modify/:id',
    [
        loginVerifyToken,
        adminRoleVerify,
        customerImageCloudUpload.single('')
    ],
    async (req, res, next) => {
        const { id } = req.params;
        const body = {
            ...req.body,
            logo: req.file.path
        }
        try {
            const searchCustomer = await CustomerModel.findById(id);
            if (!searchCustomer) {
                return res.status(404)
                    .send({
                        statusCode: 404,
                        message: 'Customer not found'
                    })
            }
            await CustomerModel.findByIdAndUpdate(id, body);
            res.status(201)
                .send({
                    message: 'Customer updated to database'
                });
        } catch (error) {
            next(error);
        }
    })

customer.delete('/customer/delete/:id',
    [
        loginVerifyToken,
        adminRoleVerify
    ],
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const searchCustomer = await CustomerModel.findById(id);
            if (!searchCustomer) {
                return res.status(404)
                    .send({
                        statusCode: 404,
                        message: 'Customer not found'
                    })
            }
            await CustomerModel.findByIdAndDelete(id);
            res.status(201)
                .send({
                    message: 'Customer deleted from database'
                });
        } catch (error) {
            next(error);
        }
    })

module.exports = customer;
