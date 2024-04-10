import express from "express";
const app = express();
import commonRoute from "./routes";

app.use(express.json());
app.use(commonRoute);

app.get("/", (req, res) => {
  res.send("working");
});
app.listen(8000, () => {
  console.log(`server is listening at 8000`);
});
