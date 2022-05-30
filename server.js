// requiring inquirer & express and then initilizing express
const inquirer = require('inquirer');

const mysql = require('mysql2');

require('console.table');


const db = mysql.createConnection(
    {
        host: 'localhost',
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
            choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Quit']
        }
    ])
        .then(data => {
            // console.log(data)
            if (data.prompts === 'View all Departments') {
                db.query('SELECT * FROM department', function (err, results) {
                    console.table(results);
                    choices();
                });
            }
            if (data.prompts === 'View all Roles') {
                db.query('SELECT * FROM roles', function (err, results) {
                    console.table(results);
                    choices();
                });

            }
            if (data.prompts === 'View all Employees') {
                db.query('SELECT * FROM employee', function (err, results) {
                    console.table(results);
                    choices();
                });

            }
            if (data.prompts === 'Add Department') {
                inquirer.prompt(
                    [
                        {
                            type: 'input',
                            name: 'dept',
                            message: 'What is the name of the department?',
                        }])
                    .then((answer => {
                        console.log(answer.dept)
                        var sql = `INSERT INTO department (names) VALUES (?)`;
                        db.query(sql, answer.dept, (err, res) => {
                            if (err) throw err;
                            console.log('Added ' + answer.dept + ' to departments');
                        })
                        choices();
                    })
                    );
            }

                // how to redo this?
            if (data.prompts === 'Add Role') {
                inquirer.prompt(
                    [
                        {type: 'input',
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
                            if(err) throw err;
                            console.log('Added new role');
                        })
                        choices();
                    }))
                
            }
            if (data.prompts === 'Add Employee') {
                db.query('SELECT * FROM ') // not sure what to do here
                choices();
            }
            if (data.prompts === 'Update Employee Role') {
                db.query('SELECT * FROM ') // not sure what to do here
                choices();
            }
            if (data.prompts === 'Quit') {
                console.log('You have quit the app, Goodbye!')
                return
            }
        }
        )
}

choices();