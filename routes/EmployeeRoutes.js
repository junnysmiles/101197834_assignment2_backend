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
        res.status(201).json({
            status: "Created"
        })
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
app.put('/api/v1/employees/:id', async (req, res) => {
    try {
        await employeeModel.findByIdAndUpdate(req.params.id, req.body)
        employee = await employeeModel.save()
        res.send(employee)
        console.log("Employee Updated.")
        res.status(200).json({
            status: "OK"
        })
    } catch(err) {
        console.log("ERROR: Employee Not Updated. " + err)
        res.status(500).send(err)
    }
})


// Employee resource is deleted
app.delete('/api/v1/employees/:id', async (req, res) => {
    try {
        const employee = await employeeModel.findByIdAndDelete(req.params.id)
        if(!employee) res.status(404).json({
            status: "No Employee Found"
        })
        res.status(204).json({
            status: "No Content"
        })
    } catch(err) {
        console.log("ERROR: " + err)
        res.status(500).send(err)
    }
})

module.exports = app