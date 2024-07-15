const Pool = require("pg").Pool;
require("dotenv").config();

const pg = require("pg");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: true,
    ca: process.env.CA_CERT,
  },
};

const pool = new pg.Pool(config);

module.exports = pool;
