const express = require("express");
const router = express.Router();

const login = require("../controllers/account/login");
const register = require("../controllers/account/register");
const resetPassword = require("../controllers/account/resetPassword");
const logout = require("../controllers/account/logout");

console.log("> " + __dirname);

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/login", (req, res) => {
  res.render("index", login);
});

router.use("/register", register);

router.get("/reset-password", (req, res) => {
  res.render("index", resetPassword);
});

router.get("/logout", (req, res) => {
  res.render("index", logout);
});

module.exports = router;
