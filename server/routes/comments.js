const express = require('express');
const CommentModel = require('../models/comments');
const EmployeeModel = require('../models/employee');
const comment = express.Router();
const loginVerifyToken = require('../middlewares/loginVerifyToken');
const createCommentValidation = require('../middlewares/createCommentValidation');

comment.post('/comment/create',
    [
        loginVerifyToken,
        createCommentValidation
    ],
    async (req, res, next) => {
        const body = {
            ...req.body,
            employeeId: req.user.id
        }
        try {
            const employee = await EmployeeModel.findById(req.user.id);
            const newComment = new CommentModel(body);
            await newComment.save();
            employee.comments.push(newComment._id);
            await employee.save();
            res.status(201).send({
                statusCode: 201,
                message: 'Comment added to this task'
            })
        } catch (error) {
            next(error);
        }
    })

comment.put('/comment/modify/:id',
    [
        loginVerifyToken
    ],
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const comment = await CommentModel.findById(id);
            if (comment.employeeId !== req.user.id) {
                return res.status(401).send('Unauthorized to modify this comment');
            }
            await CommentModel.findByIdAndUpdate(id, req.body);
            res.status(201).send({
                statusCode: 201,
                message: 'Comment modified successfully'
            })
        } catch (error) {
            next(error);
        }
    })

comment.delete('/comment/delete/:id',
    [
        loginVerifyToken
    ],
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const comment = await CommentModel.findById(id);
            if (comment.employeeId !== req.user.id) {
                return res.status(401).send('Unauthorized to delete this comment');
            }
            await CommentModel.findByIdAndDelete(id);
            res.status(201).send({
                statusCode: 201,
                message: 'Comment deleted successfully'
            })
        } catch (error) {
            next(error);
        }
    })

module.exports = comment;
