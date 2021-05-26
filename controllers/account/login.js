const { conn } = require("../../data/connect");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  console.log("> " + __dirname);

  //input
  if (await !checkInput(req.body))
    return res.json({ message: "No input or content lenght < 5" });

  //check db
  if (await !checkExistAccount(req.body))
    return res.json({ message: "Account not existed" });

  if ((await checkMatchAccount(req.body)) === false)
    return res.json({ message: "Account not match" });

  //main

  const token = jwt.sign(
    { username: req.body.username, password: req.body.password },
    process.env.KEY,
    {
      expiresIn: "7d",
    }
  );

  //res
  res.json({ message: "success", token });
};

const checkInput = (data) => {
  var bool = true;

  if (!data || data.username.length < 5 || data.password.length < 5) {
    console.log("No input or content lenght < 5");
    bool = false;
  }

  return bool;
};

const checkExistAccount = async (data) => {
  let result = null;

  const getResult = (rows) => {
    result = rows;
  };

  await conn
    .promise()
    .query(`SELECT * FROM Account WHERE username = '${data.username}'`)
    .then(([rows]) => {
      getResult(rows);
    });

  return result.length === 0 ? false : true;
};

const checkMatchAccount = async (data) => {
  let result = null;

  const getResult = (rows) => {
    result = rows;
  };

  await conn
    .promise()
    .query(`SELECT * FROM Account WHERE username  = '${data.username}'`)
    .then(([rows]) => {
      getResult(rows);
    });

  return await bcrypt.compare(data.password, result[0].PasswordHash);
};

const loginAccount = async (data) => {};

module.exports = login;
