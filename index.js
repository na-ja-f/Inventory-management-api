const express = require("express")
const dotenv = require("dotenv").config()
const connectDB = require("./config/db")
const cors = require("cors")


const app = express()

// ! cors setup
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    })
);

// ! parsers
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ! db connecting
connectDB();
const port = process.env.PORT || 5000

// ! routes
app.use('/api/', require('./routes/route'))

app.listen(port, () => console.log(`server running on ${port}`))