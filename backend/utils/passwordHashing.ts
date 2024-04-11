import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwt_payload } from "../dto/vendor";
// import dotenv from "dotenv";
// dotenv.config();
const JWT_SECRET = "MISSISIPI";

const hashedPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
};

const comparePassword = async (
  inputPassword: string,
  savedPassword: string
) => {
  const validation = await bcrypt.compare(inputPassword, savedPassword);
  return validation;
};

const generateToken = async (payload: jwt_payload) => {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "10h" });
  return token;
};

export { hashedPassword, comparePassword, generateToken };
