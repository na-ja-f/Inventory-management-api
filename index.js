const express = require("express")
const dotenv = require("dotenv").config()
const connectDB = require("./config/db")
const cors = require("cors")
const cron = require("node-cron"); // Import node-cron
const https = require('https'); // Import https module



const app = express()

// ! cors setup
app.use(
    cors({
        origin: "https://inventory-management-najaf.vercel.app",
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

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// ! routes
app.use('/api/', require('./routes/route'))

// Schedule a cron job to keep the server awake every 15 minutes
cron.schedule('*/15 * * * *', () => {
    console.log('Running cron job to keep the server awake...');
    https.get(`https://inventory-management-backend-zviu.onrender.com/health`, (res) => {
        console.log(`Health check response: ${res.statusCode}`);
    }).on('error', (err) => {
        console.error(`Error making health check request: ${err.message}`);
    });
});

app.listen(port, () => console.log(`server running on ${port}`))


