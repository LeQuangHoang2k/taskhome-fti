const { conn } = require("../../data/connect");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  console.log("> " + __dirname);

  //input
  if (await !checkInput(req.body))
    return res.json({ message: "No input or content lenght < 5" });

  //check db
  const { accountInfor } = await getInforAccount(req.body);

  if (await !checkExistAccount(req.body))
    return res.json({ message: "Account not existed" });

  if ((await checkMatchAccount(req.body)) === false)
    return res.json({ message: "Account not match" });

  //main
  const { token } =await generateToken(accountInfor);

  //res
  res.json({ message: "success", token, role: accountInfor.AccountRole });
};

const checkInput = (data) => {
  var bool = true;

  if (!data || data.username.length < 5 || data.password.length < 5) {
    console.log("No input or content lenght < 5");
    bool = false;
  }

  return bool;
};

const getInforAccount = async (data) => {
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

  return { accountInfor: result[0] };
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

const generateToken = async (data) => {
  const token = await jwt.sign({ data }, process.env.KEY, {
    expiresIn: "7d",
  });
  
  return { token };
};

module.exports = login;
