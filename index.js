const express = require("express");
const app = express();
require('dotenv').config();
const mainroutes = require("./Routes/mainroutes");
const ejs = require("ejs");
const path = require("path");
const body_parser = require("body-parser");
const connectDB = require("./Mongo/mongo");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/views"));
connectDB();
app.use("/", mainroutes);


const port = process.env.PORT;
app.listen(port, () => {
    console.log("server is running on port 8000");
})