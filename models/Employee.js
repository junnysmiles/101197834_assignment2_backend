/**
 * Assignment 2 - Full Stack Development
 * Jun Yan Gan - 101197834
 */


// Employee Schema File
const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "First Name is required."],
    trim: true,
    lowercase: true,
  },
  lastname: {
    type: String,
    required: [true, "Last Name is required."],
    trim: true,
    lowercase: true,
  },
  emailid: {
    type: String,
    required: [true, "Email is required."],
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email"
      }
  },
});

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;