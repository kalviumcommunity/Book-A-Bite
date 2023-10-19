select * from tables;

insert into users (id, username, email, password_hash, created_at, updated_at) VALUES ('2', 'ram', 'kumar@gmail.com', 'password123', NOW(), NOW())
 
insert into restaurant (restaurant_id, name, address, phone_nunmber) Values (1, 'Starbucks', 'Unimall, Jalandhar', 924075754)

insert into reservations (reservation_id, dateofbook, customer_id, table_id) values (1.NOW(),2,1)

insert into tables (table_id, status, capacity, restaurant_id) values (2, false, 2,1) 
 
update tables set status=true where table_id=2

desc tables;