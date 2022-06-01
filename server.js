// requiring inquirer & express and then initilizing express
const inquirer = require('inquirer');

const mysql = require('mysql2');
require('console.table');
const Department = require('./lib/Department')
const {getDept, newDept, deptArrFill, employeeArrFill, roleArrFill, updateRole, getEmployees} = require('./lib/helper');
let employeeArr = employeeArrFill();
let roleArr = roleArrFill();

// connected to mysql
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

// where the beginning questions are asked to the user
function choices() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'prompts',
            message: "What would you like to do?",
            choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Quit']

        }
    ]
    // swith used to go through the options with the functions below
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
            quit();
            break

        }})};

        // views all departments
function viewAllDepartments() {
    db.query('SELECT * FROM department', function(err, res) {
        if (err) throw err
        console.table(res)
        choices();
    })
};

// views all roles
function viewAllRoles() {
    db.query('SELECT * FROM roles', function (err, res) {
        console.table(res);
        choices();
    })
    
};

// views all employees
function viewAllEmployees() {
    db.query('SELECT * FROM employee', function(err, res) {
        if (err) throw err
        console.table(res)
        choices();
    } )
};


// where a department is added
function addDepartment() {
    return inquirer
        .prompt([{
            type: 'input',
            name: 'name',
            message: 'What is the name of the department?',
            validate: function(name) {
                if (!name) {
                    console.log('You must enter a name!')
                    return false;
                }
                return true;
            }
        }])  
        .then((ans) => {
            const department = new Department(ans.name);
            newDept(department);
            console.log('Department Added!');
            departments = getDept();
            deptArr = deptArrFill();
            return choices();
        })  
};


// where a role is added
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
        
// where a new employee is added
function addEmployee() {
    return inquirer
        .prompt([{
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?",
            validate: function(firstName) {
                if (!firstName) {
                    console.log('You must enter a name!')
                    return false;
                } 
                return true;
            }
        }, {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?",
            validate: function(lastName) {
                if (!lastName) {
                    console.log('You must enter a name!')
                    return false;
                } 
                return true;
            }
        }, {
            type: 'list',
            name: 'role',
            message: "What is the employee's role?",
            choices: roleArr
        }, {
            type: 'list',
            name: 'manager',
            message: "Who is the employee's manager?",
            choices: [{name:'No Manager', value:null}].concat(employeeArr)
        }])
        .then((ans) => {
            var employee = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
            db.query(employee, [ans.firstName, ans.lastName, ans.role, ans.manager], (err, response) => {
                if (err) throw err;
                console.log("Added New Employee")
            })
            return choices();
        })    
};

// how to update an employee role
function updateEmployee() {
    return inquirer
    .prompt([{
        type: 'list',
        name: 'employee',
        message: 'Which employee would you like to update?',
        choices: employeeArr
    },{
        type: 'list',
        name: 'newRole',
        message: 'What is the employees new role?',
        choices: roleArr
    }])
    .then((ans) => {
        updateRole(ans);
        console.log('Role Updated!');
        employees = getEmployees();
        employeeArr = employeeArrFill();
        return choices();
    })    
};

// to quit the application
function quit() {
    console.log('You have Quit the app, goodbye!')
    return
}