const Pool = require("pg").Pool;
require("dotenv").config();

const pg = require("pg");

const config = {
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.DBPORT,
  database: process.env.DBNAME,
  ssl: {
    rejectUnauthorized: true,
    ca: process.env.CA,
  },
};

const pool = new pg.Pool(config);

module.exports = pool;
