const { conn } = require("../../data/connect");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  console.log("> " + __dirname + "\\register");

  //input
  if (await !checkInput(req.body))
    return res.json({ message: "No input or content lenght < 5" });

  //check db
  if (await checkExistAccount(req.body))
    return res.json({ message: "Account existed" });

  //main
  await registerAccount(req.body);

  //res
  res.json({ message: "success" });
};

const checkInput = (data) => {
  var bool = true;

  if (
    !data ||
    data.username.length < 5 ||
    data.name.length < 5 ||
    data.password.length < 5
  ) {
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

  return result.length==0?false:true;
};

const registerAccount = async (data) => {
  const passwordHash = await bcrypt.hashSync(data.password, 12);
  console.log(passwordHash);
  console.log(data);

  await conn
    .promise()
    .query(
      `INSERT INTO Account (Username, PasswordHash, AccountName,AccountRole) VALUES ('${data.username}', '${passwordHash}', '${data.name}','user');`
    )
    .then(([rows]) => {
      // getResult(rows);
    });
};

module.exports = register;
