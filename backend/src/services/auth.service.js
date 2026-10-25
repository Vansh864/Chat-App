import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";

import { getUserByEmail } from "./user.service.js";

export const generateToken = (id) => {
  //generates JWT Token
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 1000 * 60 * 60 * 24 * 7,
  });

  return token;
};

export const createUser = async (email, password, fullName) => {
  //Create User and save to database
  const existingUser = await getUserByEmail(email);
  if (existingUser) throw new Error("User already exists");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new userModel({
    fullName,
    email,
    password: hashedPassword,
  });

  return await newUser.save();
};

export const loginUser = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user) throw new Error("Invalid email or password");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");
  return user;
};
