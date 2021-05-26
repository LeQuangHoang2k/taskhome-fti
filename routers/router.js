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

router.get("/shopping", (req, res) => {
  res.render("shopping");
});

router.post("/register", register);

router.post("/login", login);

router.get("/reset-password", resetPassword);

router.post("/logout", logout);

module.exports = router;
