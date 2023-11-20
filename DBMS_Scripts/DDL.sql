CREATE database bookabite;


CREATE TABLE users (
     id INT PRIMARY KEY,
     username VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL,
     password_hash VARCHAR(255) NOT NULL,
     created_at DATETIME,
     updated_at DATETIME
);

CREATE TABLE restaurant (
    restaurant_id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    address VARCHAR(100) NOT NULL,
    phone_nunmber VARCHAR(15) NOT NULL);

CREATE TABLE reservations (
    reservation_id INT PRIMARY KEY,
    dateofbook DATE NOT NULL,
    customer_id INT,
    table_id INT,
    FOREIGN KEY(table_id) REFERENCES tables(table_id),
    FOREIGN KEY(customer_id) REFERENCES users(id)
)

CREATE TABLE tables (
    table_id INT PRIMARY KEY,
    status BOOL NOT NULL,
    capacity INT NOT NULL,
    restaurant_id INT,
    FOREIGN KEY(restaurant_id) REFERENCES restaurant(restaurant_id)
);


ALTER TABLE reservations ADD table_id INT

ALTER TABLE reservations ADD FOREIGN KEY (table_id) REFERENCES tables(table_id);

select * from users where id = 2;

SELECT username, Count(*) AS user_count FROM users GROUP BY username HAVING user_count > 1;  

SELECT reservations.reservation_id, reservations.dateofbook, users.username
FROM reservations
INNER JOIN users ON reservations.customer_id = users.id;

SELECT tables.table_id, tables.status, reservations.reservation_id
FROM tables
LEFT JOIN reservations ON tables.table_id = reservations.table_id;

SELECT reservations.reservation_id, reservations.dateofbook, tables.table_id
FROM reservations
RIGHT JOIN tables ON reservations.table_id = tables.table_id;

CREATE ROLE admin;
CREATE ROLE waiter;
CREATE ROLE customer;

GRANT SELECT, INSERT, UPDATE, DELETE ON restaurant TO admin, waiter;
GRANT SELECT ON tables TO waiter, customer;
GRANT SELECT, INSERT, UPDATE, DELETE ON reservations TO waiter, customer;

GRANT admin TO 'root'@'localhost';

SELECT reservation_id, dateofbook
FROM reservations
WHERE customer_id = (SELECT id FROM users WHERE username = 'ram');

CREATE INDEX idx_username ON users(username);

SELECT username
FROM users
WHERE username = 'john_doe';