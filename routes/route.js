const express = require('express')
const router = express.Router();
const { login, getProducts, removeProduct, addProduct } = require("../controllers/controller")
const { protect } = require("../middlewares/authMidlleware")

router.post('/login', login)
router.get('/get-products', protect, getProducts)
router.patch('/remove-product', protect, removeProduct)
router.patch('/add-product', protect, addProduct)

module.exports = router