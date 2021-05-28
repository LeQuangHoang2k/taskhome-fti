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
  const { listBillId } = await getListBillId(listBill);
  //   console.log(listBillId);
  const { listBillDetail } = await getAllBillDetailAccount(listBillId);
  //   console.log(listBillDetail);
  //   console.log("listBill", listBill);

  res.json({
    message: "success",
    listBill,
    listBillDetail,
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

const getListBillId = (data) => {
  var listBillId = [];

  data.forEach((item) => {
    listBillId.push(item.CartId);
  });

  return { listBillId };
};

const getAllBillDetailAccount = async (listBillId) => {
  console.log("xx", listBillId);

  let listBillDetail = null;

  const getListBillDetail = (rows) => {
    listBillDetail = rows;
    // console.log(rows);
  };

  // `SELECT * FROM answer WHERE id_question in (SELECT t.id FROM (SELECT id FROM question ORDER BY rand() LIMIT 10 ) as t)`
  await conn
    .promise()
    .query(`SELECT * FROM OrderDetail WHERE CartId IN (${listBillId})`)
    .then(([rows]) => {
      getListBillDetail(rows);
    });
  return { listBillDetail };
};

module.exports = loadBill;
