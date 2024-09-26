const express = require('express')
const router = express.Router();
const { login, getProducts, removeProduct } = require("../controllers/controller")
const { protect } = require("../middlewares/authMidlleware")

router.post('/login', login)
router.get('/get-products', protect, getProducts)
router.patch('/remove-product', protect, removeProduct)

module.exports = router