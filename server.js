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
var roleArr = [];
function selectRole() {
  db.query("SELECT * FROM roles", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }

  })
  return roleArr;
}

        function addEmployee() { 
            inquirer.prompt([
                {
                  name: "firstname",
                  type: "input",
                  message: "Enter their first name "
                },
                {
                  name: "lastname",
                  type: "input",
                  message: "Enter their last name "
                },
                {
                  name: "role",
                  type: "list",
                  message: "What is their role? ",
                  choices: selectRole()
                },
                {
                    name: "choice",
                    type: "rawlist",
                    message: "Whats their managers name?",
                    choices: selectManager()
                }
            ]).then(function (val) {
              var roleId = selectRole().indexOf(val.role) + 1
              var managerId = selectManager().indexOf(val.choice) + 1
              connection.query("INSERT INTO employee SET ?", 
              {
                  first_name: val.firstName,
                  last_name: val.lastName,
                  manager_id: managerId,
                  role_id: roleId
                  
              }, function(err){
                  if (err) throw err
                  console.table(val)
                  startPrompt()
              })
        
          })
        }