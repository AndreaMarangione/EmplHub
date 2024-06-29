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

customer.get('/customer/:id',
    [
        loginVerifyToken
    ],
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const customers = await CustomerModel.findById(id)
                .select('name email logo createdAt');
            if (!customers) {
                res.status(404).send('Customer not found');
            }
            res.status(200).send(customers);
        } catch (error) {
            next(error);
        }
    })

customer.post('/customer/register',
    [
        loginVerifyToken,
        adminRoleVerify,
        // createCustomerValidation,
        createCustomerExist,
        customerImageCloudUpload.single('customerLogo')
    ],
    async (req, res, next) => {
        const body = {
            name: req.body.name,
            email: req.body.email,
            logo: req.file.path || 'https://picsum.photos/500/500'
        }
        try {
            const newCustomer = new CustomerModel(body);
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
            await CustomerModel.findByIdAndUpdate(id, req.body);
            res.status(201)
                .send({
                    message: 'Customer updated to database'
                });
        } catch (error) {
            next(error);
        }
    })

customer.patch('/customer/logo/:id',
    [
        loginVerifyToken,
        adminRoleVerify,
        customerImageCloudUpload.single('customerModifyLogo')
    ],
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const customer = await CustomerModel.findById(id);
            if (!customer) {
                return res.status(404).send('Customer not found');
            }
            const updatedCustomer = await CustomerModel.findByIdAndUpdate(id, { logo: req.file.path }, { new: true });
            res.status(201).send(updatedCustomer);
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
