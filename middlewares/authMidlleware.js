const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const Employee = require('../models/employeeModel')

const protect = asyncHandler(async (req, res, next) => {
    let token
    // console.log('request', req);
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // ? get token from header
            token = req.headers.authorization.split(' ')[1]
            req.token = token;
            // ? verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // ?get user from token
            req.user = await Employee.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error);
            res.status(401)
            throw new Error('not authorized')
        }
    }
    if (!token) {
        res.status(401)
        throw new Error('not authorized and no token')
    }
})

module.exports = { protect }