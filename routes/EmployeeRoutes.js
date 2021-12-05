/**
 * Assignment 2 - Full Stack Development
 * Jun Yan Gan - 101197834
 */


// Routes File
const express = require('express');
const employeeModel = require('../models/Employee');
const app = express();


// All Employee resources are fetched
app.get('/api/v1/employees', async (req, res) => {
    const employees = await employeeModel.find({})

    try {
        res.send(employees)
        res.status(200).send("OK")
    } catch(err) {
        console.log("ERROR: " + err)
        res.status(500).send(err)
    }
});


// A new Employee resource is created
app.post('/api/v1/employees', async (req, res) => {
    const employee = new employeeModel(req.body)

    try {
        await employee.save()
        res.send(employee)
        res.status(201).send("Created")
    } catch(err) {
        console.log("ERROR: Employee Not Saved. " + err)
        res.status(500).send(err)
    }
});


// One Employee resource is fetched
app.get('/api/v1/employees/:id', async (req, res) => {
    try {
        const id = await employeeModel.findById(req.params.id)
        res.send(id)
        res.status(200).send("OK")
    } catch(err) {
        console.log("ERROR: " + err)
        res.status(500).send(err)
    }
});


// Employee resource is updated
app.put('/api/v1/employees/:_id', async (req, res) => {
    try {
        await employeeModel.findByIdAndUpdate(req.params._id, req.body)
        employee = await employeeModel.save()
        res.send(employee)
        console.log("Employee Updated.")
        res.status(200).send("OK")
    } catch(err) {
        console.log("ERROR: Employee Not Updated. " + err)
        res.status(500).send(err)
    }
})


// Employee resource is deleted
app.delete('/api/v1/employees/:_id', async (req, res) => {
    try {
        const employee = await employeeModel.findByIdAndDelete(req.params._id)
        if(!employee) res.status(404).send("No Employee Found.")
        res.status(204).send("No Content")
    } catch(err) {
        console.log("ERROR: " + err)
        res.status(500).send(err)
    }
})

module.exports = app