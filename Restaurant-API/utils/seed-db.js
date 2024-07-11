import { connectToDb } from "./db.js";
import User from "../models/user.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";


const hashPassword = async (plainTextPassword) => {
  const hashedPassword = await bcrypt.hash(plainTextPassword, 10);
  return hashedPassword;
};

const userId = "64032e194edba1166601abb7";
const adminId = "640359784edba1166601ae7d";

const seedingData = {
 
  users: [
    {
      email: "admin@gmail.com",
      userName: "Administrator",
      password: await hashPassword("adminPassword"),
      role: "admin",
      _id: adminId,
    },
    {
      email: "user@gmail.com",
      userName: "User",
      password: await hashPassword("userPassword"),
      role: "user",
      _id: userId,
    },
 
  ],
};

const seedDb = async () => {
  await connectToDb();
  console.log("Database connected!");

 
  await mongoose.connection.db.dropDatabase();
  console.log("All previous data dropped.");
  
  const dbUsers = await User.create(seedingData.users);
  console.log(`Created ${dbUsers.length} users in the database!`);
  await mongoose.disconnect();
  console.log("Disconnected from db. All done!");
};

seedDb();
