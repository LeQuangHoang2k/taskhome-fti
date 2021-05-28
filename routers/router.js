const express = require("express");
const router = express.Router();

const login = require("../controllers/account/login");
const register = require("../controllers/account/register");
const resetPassword = require("../controllers/account/resetPassword");
const logout = require("../controllers/account/logout");
const loadProduct = require("../controllers/actions/loadProduct");
const purchase = require("../controllers/cart/purchase");
const loadBill = require("../controllers/actions/loadBill");
const changeRole = require("../controllers/account/admin/changeRole");
const changeAmount = require("../controllers/account/admin/changeAmount");

console.log("> " + __dirname);

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/shopping", (req, res) => {
  res.render("shopping");
});

router.post("/loadProduct", loadProduct);

router.post("/loadBill", loadBill);

router.post("/purchase", purchase);

router.get("/admin", (req, res) => {
  res.render("admin");
});

router.post("/change-role", changeRole);
router.post("/change-amount", changeAmount);

router.post("/register", register);

router.post("/login", login);

router.get("/reset-password", resetPassword);

router.post("/logout", logout);

module.exports = router;
