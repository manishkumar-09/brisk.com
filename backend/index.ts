import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import commonRoute from "./routes";
import { db } from "./config/db";
const PORT = process.env.PORT;
import path from "path";

//middlewares
app.use(express.json());
app.use(commonRoute);
app.use("/images", express.static(path.join(__dirname, "images")));

app.get("/", (req, res) => {
  res.send("working");
});

//database connnection
db.on("error", (err) => {
  console.log("mongoose connection error", err);
});
db.on("connected", (err) => {
  console.log("connected to mongodb database");
});

app.listen(8000, () => {
  console.log(`server is listening at ${PORT}`);
});
