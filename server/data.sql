-- Active: 1721215210337@@127.0.0.1@5432@chinguprojectdb@public
CREATE DATABASE ChinguProjectDB;

DROP TABLE users;

CREATE TABLE users ( 
  id VARCHAR(255) PRIMARY KEY,
  user_email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE users IF EXISTS ALTER created_at TYPE <data_type> 

SELECT user_email FROM users WHERE user_email = 'admin@gmail.com';