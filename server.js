// requiring inquirer & express and then initilizing express
const inquirer = require('inquirer');

const mysql = require('mysql2');

const table = require('console.table');
const Department = require('./lib/Department')
const {getDept, newDept, deptArrFill, employeeArrFill, roleArrFill} = require('./lib/helper');
let employeeArr = employeeArrFill();
let roleArr = roleArrFill();
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
        

        var managersArr = [];
function selectManager() {
  db.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      managersArr.push(res[i].first_name);
    }

  })
  return managersArr;
}
// var roleArr = [];
// function selectRole() {
//   db.query("SELECT * FROM roles", function(err, res) {
//     if (err) throw err
//     for (var i = 0; i < res.length; i++) {
//       roleArr.push(res[i].title);
//     }

//   })
//   return roleArr;
// }

const addEmployee = () => {
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
            // newEmployee(employee);
            // console.log('Employee Added!');
            // employees = getEmployees();
            // employeeArr = employeeArrFill();
            return choices();
        })    
};

// function addEmployee() { 
//     inquirer.prompt([
//         {
//           name: "firstname",
//           type: "input",
//           message: "Enter their first name "
//         },
//         {
//           name: "lastname",
//           type: "input",
//           message: "Enter their last name "
//         },
//         {
//           name: "role",
//           type: "list",
//           message: "What is their role? ",
//           choices: selectRole()
//         },
//         {
//             name: "choice",
//             type: "rawlist",
//             message: "Whats their managers name?",
//             choices: selectManager()
//         }
//     ]).then(function (val) {
//       var roleId = selectRole().indexOf(val.role) + 1
//       var managerId = selectManager().indexOf(val.choice) + 1
//       db.query("INSERT INTO employee SET ?", 
//       {
//           first_name: val.firstName,
//           last_name: val.lastName,
//           manager_id: managerId,
//           role_id: roleId
          
//       }, function(err){
//           if (err) throw err
//           console.table(val)
//           choices()
//       })

//   })
// }