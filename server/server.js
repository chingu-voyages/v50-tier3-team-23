const PORT = process.env.PORT ?? 8000;
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const Stripe = require('stripe');
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
const pool = require("./db");

app.get("/", async (req, res) => {
  res.send("Hello World");
});

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

app.post("/create-checkout-session", async (req,res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Burger',
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      return_url: "http://localhost:5173/return?session_id={CHECKOUT_SESSION_ID}",
    });
  
    res.send({ clientSecret: session.client_secret });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
})

app.get('/session-status', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email
  });
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
