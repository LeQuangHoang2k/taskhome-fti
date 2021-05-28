const { conn } = require("../../data/connect");

const loadBill = async (req, res) => {
  console.log("> " + __dirname + "\\loadBill.js");

  //input
  if (await !checkInput(req.body))
    return res.json({ message: "Dont have type product" });
  console.log(req.body);

  //checkdb
  if (await !checkExistAccount(req.body))
    return res.json({ message: "Account doesn't existed" });

  if (await !checkExistBillAccount(req.body))
    return res.json({ message: "Welcome new user" });

  console.log("ok");

  //main
  const { listBill } = await getAllBillAccount(req.body);
  console.log("listBill", listBill);

  res.json({
    message: "success",
    listBill,
  });
};

const checkInput = (data) => {
  var bool = true;

  if (!data || !data.accountId) {
    console.log("dont have account id");
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
    .query(
      `SELECT * FROM Account WHERE AccountId = ${parseInt(data.accountId)}`
    )
    .then(([rows]) => {
      getResult(rows);
    });

  return result.length == 0 ? false : true;
};

const checkExistBillAccount = async (data) => {
  let result = null;

  const getResult = (rows) => {
    result = rows;
  };

  await conn
    .promise()
    .query(`SELECT * FROM Cart WHERE AccountId = ${parseInt(data.accountId)}`)
    .then(([rows]) => {
      getResult(rows);
    });

  return result.length == 0 ? false : true;
};

const getAllBillAccount = async (data) => {
  let listBill = null;

  const getResult = (rows) => {
    listBill = rows;
  };

  await conn
    .promise()
    .query(`SELECT * FROM Cart WHERE AccountId = ${parseInt(data.accountId)}`)
    .then(([rows]) => {
      getResult(rows);
    });

  return { listBill };
};

module.exports = loadBill;
