const PORT = process.env.PORT ?? 8000;
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { v4: uuidv4 } = require("uuid");

const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const pool = require("./db");

app.get("/", async (req, res) => {
  res.send("Hello World");
});

app.get("/getAllUsers", async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM users");
    const users = response.rows.map((user) => {
      return user.user_email;
    });
    res.json(users);
    return users;
  } catch (error) {
    console.log(error);
  }
});

app.post("/signup", async (req, res) => {
  const { user_email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    if (!user_email || !password) {
      return res.json({ error: "No data provided", status: 401 });
    }

    const data = await pool.query(
      `SELECT * FROM users WHERE user_email = user_email;`
    );

    const email = data.rows.map((user) => {
      return user.user_email;
    });

    if (email.includes(user_email)) {
      return res.json({ error: "User already exists!", status: 401 });
    }

    const id = uuidv4();
    await pool.query(
      `INSERT INTO users(id, user_email, password) VALUES($1, $2, $3)`,
      [id, user_email, hashedPassword]
    );
    const token = jwt.sign({ user_email }, "secret", { expiresIn: "30sec" });
    res.json({
      message: "SUCCESS CREATING USER",
      status: 200,
      token,
      user_email,
    });
  } catch (error) {
    console.log("ERROR CREATING USER: ", error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { user_email, password } = req.body;
    const user = await pool.query(
      `SELECT user_email FROM users WHERE user_email = ${user_email}`
    );
    if (!user) return res.status(400).json("Inavlid email or password...");
    console.log("SUCCESS CREATING USER");
    return response;
  } catch (error) {
    console.log("ERROR CREATING USER: ", error.detail);
    return { status: 401, message: error };
  }
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
