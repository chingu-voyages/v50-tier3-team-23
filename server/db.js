const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.DBPORT,
  database: "v50_tier3_team_23",
});

module.exports = pool;
