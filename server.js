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
    db.query('SELECT * FROM department', function(err, res) {
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

function viewAllEmployees() {
    db.query('SELECT * FROM employee', function(err, res) {
        if (err) throw err
        console.table(res)
        choices();
    } )
};

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name for the new Department?'
        }
    ])
    .then(function(res) {
        var query = db.query('INSERT INTO department SET ?', {name: res.name},
        function(err){
            if (err) throw err
            console.table(res);
            choices();
       })
    })
};

function addRole() {
    inquirer.prompt(
        [
            {
                type: 'input',
                name: 'addRole',
                message: 'What role would you like to add?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary for this role?'
            },
            {
                type: 'input',
                name: 'departid',
                message: 'What is the department code?'
            }])
            .then((answer => {
                var sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
                db.query(sql, [answer.addRole, answer.salary, answer.departid], (err, res) => {
                    if (err) throw err;
                    console.log('Added new role');
                })
                choices();
            }))
            
        }

        function addEmployee() {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'fname',
                    message: 'What is this employees first name?'
                },
                {
                    type: 'input',
                    name: 'lname',
                    message: 'What is this employees last name?'   
                },
                {   type: 'input',
                    name: 'managerID',
                    message: 'What is this employees manager id?',
                },
                {
                    type: 'input',
                    name: 'newID',
                    message: 'What is this new employees ID number?'
                }
            ])
                .then((answer => {
                    var msql = `INSERT INTO employee (first_name, last_name, manager_id) VALUES (?, ?, ?, ?)`;
                    db.query(msql, [answer.fname, answer.lname, answer.managerID, answer.newID], (err, res) => {
                        if (err) throw err;
                        console.log('Added a new Employee!');
                    })
                    choices();
                }))
        }

  




