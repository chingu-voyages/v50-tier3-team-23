const { Pool } = require("pg");
require("dotenv").config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
};

if (process.env.NODE_ENV === "production") {
  config.ssl = {
    rejectUnauthorized: true,
    ca: process.env.CA_CERT,
  };
}

const pool = new Pool(config);

module.exports = pool;
