INSERT INTO users (username, email, password, createdAt, updatedAt) VALUES ('Rahul', 'rahul@gmail.com', 'password@123', NOW(), NOW());

SELECT * FROM restaurant;

INSERT INTO reservations (dateofbook, customer_id, reservation_id) VALUES ('2021-01-01', 1, 1);

UPDATE reservations SET dateofbook = '2021-01-02' WHERE reservation_id = 1;

DELETE FROM reservations WHERE reservation_id = 1;
