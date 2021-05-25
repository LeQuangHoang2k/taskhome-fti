const express = require("express");
const http = require("http");
const cors = require("cors");
const ejs = require("ejs");
const path = require("path");

const router = require("./routers/router");

const app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(router);

app.listen(4000, () => console.log("http://localhost:4000/"));
