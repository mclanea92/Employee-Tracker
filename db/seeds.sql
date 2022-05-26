INSERT INTO department (name)
VALUES ("Sales"), -- dept 1
       ("Engineering"), -- dept 2
       ("Finance"), -- dept 3
       ("Legal"); -- dept 4

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, "Sales Lead", 120000, 1),
       (2, "Salesperson", 80000, 1),
       (3, "Lead Engineer", 150000, 2),
       (4, "Software Engineer", 120000, 2),
       (5, "Account Manager", 160000, 3),
       (6, "Accountant", 125000, 3),
       (7, "Legal Team Lead", 250000, 4),
       (8, "Lawyer", 190000, 4);

    INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES ("John", "Doe", 1, null),
           ("Mike", "Chan", 2, 1),
           ("Ashley", "Rodriguez", 3, null),
           ("Kevin", "Tupik", 4, 3),
           ("Kumal", "Singh", 5, null),
           ("Malia", "Brown", 6, 5),
           ("Sarah", "Lourd", 7, null),
           ("Tom", "Allen", 8, 7);



