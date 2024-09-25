const mongoose = require("mongoose")

const employeeSchema = mongoose.Schema({
    username: String,
    password: String,
})

module.exports = mongoose.model('Employee', employeeSchema)