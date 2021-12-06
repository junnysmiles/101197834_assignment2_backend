/**
 * Assignment 2 - Full Stack Development
 * Jun Yan Gan - 101197834
 */


// Server.js File
var express = require('express')
var app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const employeeRouter = require('./routes/EmployeeRoutes.js');

const DB_URL = "mongodb+srv://junnysmiles:junny123@employees.7rtkp.mongodb.net/101197834_assignment2?retryWrites=true&w=majority"

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())

mongoose.Promise = global.Promise;

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use(employeeRouter);

const PORT = process.env.PORT || 9090

app.listen(PORT, () => {
    console.log("Server is listening on port 9090");
});