const express = require('express');
const CustomerModel = require('../models/customer');
const customer = express.Router();
const loginVerifyToken = require('../middlewares/loginVerifyToken');
const { customerImageCloudUpload } = require('../cloud/cloud');

customer.get('/customer', async (req, res, next) => {
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
        customerImageCloudUpload.single('')
    ],
    async (req, res, next) => {
        try {
            
        } catch (error) {

        }
    })
