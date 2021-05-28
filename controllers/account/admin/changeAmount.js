const { conn } = require("../../../data/connect");

const changeAmount = async (req, res) => {
  console.log("> " + __dirname + "\\changeAmount.js");

  //input
  console.log("b", req.body);
  if (await !checkInput(req.body))
    return res.json({ message: "No input or content lenght < 5" });

  //check db
  // const { accountInfor } = await getInforAccount(req.body);

  if ((await checkExistProduct(req.body)) === false)
    return res.json({ message: "Product not existed" });
  //   console.log("qua");

  //main
  await updateAmountProduct(req.body);

  //res
  res.json({
    message: "success",
  });
};

// const formatData = (data) => {
//   var array = [];
//   var object = {};

//   array = data.split("; ");
//   array.forEach((item) => {
//     item = item.split("=");
//     object[item[0]] = item[1];
//   });

//   return object;
// };

const checkInput = (data) => {
  var bool = true;

  if (
    !data ||
    data.idProduct.length <= 0 ||
    !data.amount ||
    data.amount.length <= 0 ||
    !Number.isInteger(parseInt(data.amount)) ||
    parseInt(data.amount) < 0
  ) {
    console.log(
      "No input",
      parseInt(data.amount),
      Number.isInteger(parseInt(data.amount))
    );
    bool = false;
  }

  return bool;
};

// const getInforAccount = async (data) => {
//   let result = null;

//   const getResult = (rows) => {
//     result = rows;
//   };

//   await conn
//     .promise()
//     .query(`SELECT * FROM Account WHERE AccountId = ${parseInt(data.id)}`)
//     .then(([rows]) => {
//       getResult(rows);
//     });

//   return { accountInfor: result[0] };
// };

const checkExistProduct = async (data) => {
  let result = null;

  const getResult = (rows) => {
    result = rows;
  };

  await conn
    .promise()
    .query(
      `SELECT * FROM Product WHERE ProductId = ${parseInt(data.idProduct)}`
    )
    .then(([rows]) => {
      getResult(rows);
    });
  console.log(result.length);
  return result.length === 0 ? false : true;
};

// const checkPasswordAccount = async (client, db) => {
//   return await bcrypt.compare(client.password, db.PasswordHash);
// };

// const generateToken = async (data) => {
//   const token = await jwt.sign({ data }, process.env.KEY, {
//     expiresIn: "7d",
//   });

//   return { token };
// };

const updateAmountProduct = async (data) => {
  await conn
    .promise()
    .query(
      `UPDATE Product SET ProductAmount = '${
        data.amount
      }' WHERE ProductId = ${parseInt(data.idProduct)}`
    )
    .then(([rows]) => {
      //   getResult(rows);
    });
};

module.exports = changeAmount;
