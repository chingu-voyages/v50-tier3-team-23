import express from "express";
import userController from "./controllers/userController.js";
import auth from "./middleware/auth.js";
import validate from "./middleware/validate.js";
import { body } from "express-validator";

const router = express.Router();




router
  .route("/register")
  .post(
    body("email").isEmail(),
    body("role").not().exists(),
    body("password").isLength({ min: 8 }),
    validate,
    userController.register
  );
router.route("/login").post(userController.login);

export default router;
