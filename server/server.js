const PORT = process.env.PORT ?? 8000;
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { v4: uuidv4 } = require("uuid");

const cors = require("cors");
const Stripe = require("stripe");
const app = express();
require("dotenv").config();

app.use(cors({
  origin: ["https://resteraunt-app-client.netlify.app", "http://localhost:5173"]
}));
app.use(express.json());

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const fs = require('fs');
const path = require('path');
const pool = require("./db");

// // Run the SQL script to initialize the database
// const initializeDatabase = async () => {
//   const sql = fs.readFileSync(path.join(__dirname, 'data.sql')).toString();
//   try {
//     await pool.query(sql);
//     console.log('Database initialized successfully');
//   } catch (err) {
//     console.error('Error initializing database:', err);
//   }
// };

// initializeDatabase();

app.get("/", async (req, res) => {
  res.send("Hello From Server");
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
    const token = jwt.sign({ user_email }, "secret", { expiresIn: "1hr" });
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
    const data = await pool.query(
      `SELECT password FROM users WHERE user_email = '${user_email}';`
    );
    const hashedPassword = data.rows[0].password;
    const match = await bcrypt.compare(password, hashedPassword);
    if (!match) {
      return res.json({ error: "Incorrect password or email", status: 401 });
    }
    const token = jwt.sign({ user_email }, "secret", { expiresIn: "1hr" });
    return res.json({
      message: "Logged In",
      status: 200,
      token,
      user_email,
    });
  } catch (error) {
    console.log("ERROR LOGGING IN USER: ", error);
    return { status: 401, message: error };
  }
});

app.post("/create-checkout-session", async (req, res) => {
  const data = req.body;
  console.log('Received data:', data);
  if (!data) {
    return res.status(400).send({ error: "No data received" });
  }
  try {
    const lineItems = data.map(item => ({
      price_data: {
        currency: 'usd',
        unit_amount: item.unit_amount,
        product_data: item.product_data,
      },
      quantity: item.quantity,
    }));
    console.log('Line items:', lineItems);
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      return_url:
        "https://resteraunt-app-client.netlify.app/return?session_id={CHECKOUT_SESSION_ID}",
    });
    res.send({ clientSecret: session.client_secret });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get("/session-status", async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email,
  });
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
