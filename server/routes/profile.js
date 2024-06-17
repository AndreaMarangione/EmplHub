const express = require('express');
const profile = express.Router();
const profileImageCloudUpload = require('../cloud/cloud');
const loginVerifyToken = require('../middlewares/loginVerifyToken');

profile.patch('/profile/image'),
    [
        loginVerifyToken,
        profileImageCloudUpload.single('')
    ],
    async (req, res, next) => {
        try {

        } catch (error) {
            next(error);
        }
    }

module.exports = profile;
