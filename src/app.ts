import express from "express";
const mongoose = require("mongoose");
import setRouter from "./router";
import config from "../config/config";


const app = express();
const port = 3000;
// const url = "mongodb+srv://anushashresthacharya:anusha@cluster0.pb5xvui.mongodb.net/users?retryWrites=true&w=majority";
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

setRouter(app);
mongoose
  .connect(config.db)
  .then(() => console.log("Mongo is connected"))
  .catch((err: any) => console.log("mongo error", err));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
