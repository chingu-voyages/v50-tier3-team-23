const PORT = process.env.PORT ?? 8000;
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const pool = require("./db");

app.get("/getAllUsers", async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM users");
    res.json(response.rows);
    return response.rows;
  } catch (error) {
    console.log(error);
  }
});

app.post("/createUser", async (req, res) => {
  try {
    const { user_email, name } = req.body;
    console.log("email: ", user_email, "name: ", name);
    const id = uuidv4() || 2;
    const response = await pool.query(
      `INSERT INTO users(id, user_email, name) VALUES($1, $2, $3)`,
      [id, user_email, name]
    );
    console.log("SUCCESS CREATING USER");
    return response;
  } catch (error) {
    console.log("ERROR CREATING USER");
    console.log(error);
  }
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
