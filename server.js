/**
 * Assignment 2 - Full Stack Development
 * Jun Yan Gan - 101197834
 */

var express = require('express')
var app = express()
const mongoose = require('mongoose');
const employeeRouter = require('./routes/EmployeeRoutes.js');

const DB_URL = "mongodb+srv://junnysmiles:junny123@employees.7rtkp.mongodb.net/101197834_assignemtn2?retryWrites=true&w=majority"

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

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


app.get('/', (req, res) => {
    res.send("<h1>Welcome to Assignment 2 - Full Stack Development</h1>");
});

app.use(employeeRouter);

app.listen(9090, () => {
    console.log("Server is listening on port 8080");
});