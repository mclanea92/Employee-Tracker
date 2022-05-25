// requiring inquirer & express and then initilizing express
const inquirer = require('inquirer');
// const express = require('express');
// const app = express();
const mysql = require('mysql2');

// requiring classes
const Department = require('./lib/Department');
const Employee = require('./lib/Employee');
const Roles = require('./lib/Roles');

const db = mysql.createConnection(
   { host: 'localhost',
     user: 'root',
    password: '',
    database: 'employeeTracker_db'
},
console.log('connected to employeeTracker_db')
);

const choices = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'prompts',
            message: 'What would you like to do?',
            choices: ['View all Departments', 'View all Roles']
        }
    ])
    .then(data => {
        console.log(data)
        if (data.prompts === 'View all Departments'){
            db.query('SELECT * FROM department', function (err, results) {
                console.log(results);
              });
        }
    }
        )
}

choices();