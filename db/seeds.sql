INSERT INTO department (names)
VALUES ("Sales"), -- dept 1
       ("Engineering"), -- dept 2
       ("Finance"), -- dept 3
       ("Legal"); -- dept 4

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, "Sales Lead", 120000, 1), --
       (2, "Salesperson", 80000, 1), --
       (3, "Lead Engineer", 150000, 2), -- 
       (4, "Software Engineer", 120000, 2), --
       (5, "Account Manager", 160000, 3),
       (6, "Accountant", 125000, 3), --
       (7, "Legal Team Lead", 250000, 4), --
       (8, "Lawyer", 190000, 4); --

    INSERT INTO employee (first_name, last_name, manager_id, role_id)
    VALUES ("John", "Doe", null, 1),
           ("Mike", "Chan", 1, 2),
           ("Ashley", "Rodriguez", null, 3),
           ("Kevin", "Tupik", 3, 4),
           ("Kumal", "Singh", null, 5),
           ("Malia", "Brown", 5, 6),
           ("Sarah", "Lourd", null, 7),
           ("Tom", "Allen", 7, 8);



