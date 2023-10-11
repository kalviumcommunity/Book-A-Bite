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
 phone_nunmber INT NOT NULL
)

CREATE TABLE reservations (
    reservation_id INT PRIMARY KEY,
    dateofbook DATE NOT NULL,
    customer_id INT,
    FOREIGN KEY(customer_id) REFERENCES users(id)
)

CREATE TABLE tables (
    table_id INT PRIMARY KEY,
    status BOOL NOT NULL,
    capacity INT NOT NULL,
    reservation_id INT,
    FOREIGN KEY(reservation_id) REFERENCES reservations(reservation_id)
)

ALTER TABLE tables
ADD reservation_id INT;

ALTER TABLE tables
ADD
FOREIGN KEY (reservation_id)
REFERENCES reservations(reservation_id);

DROP Table tables

TRUNCATE TABLE reservations

RENAME TABLE reservations TO reservation