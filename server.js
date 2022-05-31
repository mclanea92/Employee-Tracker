// requiring inquirer & express and then initilizing express
const inquirer = require('inquirer');

const mysql = require('mysql2');

const table = require('console.table');


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employee_trackerDB'
    },
    console.log('connected to employee_trackerDB')
);

db.connect(function(err) {
    if (err) throw err
    console.log('you are now connected to the database')
    choices();
});


function choices() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'prompts',
            message: "What would you like to do?",
            choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Quit']

        }
    ]
    ).then(function(data) {
        switch (data.prompts) {
            case 'View all Departments':
            viewAllDepartments();
            break;

            case 'View all Roles':
            viewAllRoles();
            break;

            case 'View all Employees':
            viewAllEmployees();
            break;

            case 'Add Department':
            addDepartment();
            break;

            case 'Add Role':
            addRole();
            break;

            case 'Add Employee':
            addEmployee();
            break;

            case 'Update Employee Role':
            updateEmployee();
            break;

            case 'Quit':
            quitApp();
            break

        }})};

function viewAllDepartments() {
    db.query('SELECT * FROM department',
    function(err, res) {
        if (err) throw err
        console.table(res)
        choices();
    })
};

function viewAllRoles() {
    db.query('SELECT * FROM roles', function (err, res) {
        console.table(res);
        choices();
    })
    
};


