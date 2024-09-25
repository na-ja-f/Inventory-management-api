// ! module imports
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
// ! models
const Employee = require("../models/employeeModel")
const Product = require("../models/productModel")
// ! helpers imports
const generateToken = require('../utils/generateToken')

// ! User Login
// ? POST /login
const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const employee = await Employee.findOne({ username });


    if (employee && (await bcrypt.compare(password, employee.password))) {
        res.json({
            message: "Login Successful",
            token: generateToken(employee.id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid Credentials");
    }
});

// ! get all products
// ? GET /post/get-products
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find()
    res.status(200).json(products)
})

// ! remove product from inventory
// ? PATCH /post/remove-products
const removeProduct = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body
    const product = await Product.findById(productId)
    product.quantity -= quantity
    await product.save()

    const products = await Product.find()
    res.status(200).json(products)
})

// ! add product to inventory
// ? PATCH /post/remove-products
const addProduct = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body
    const product = await Product.findById(productId)
    product.quantity += parseInt(quantity)
    await product.save()

    const products = await Product.find()
    res.status(200).json(products)
})

module.exports = {
    login,
    getProducts,
    removeProduct,
    addProduct
}