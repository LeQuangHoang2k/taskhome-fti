const { conn } = require("../../data/connect");

const loadProduct = async (req, res) => {
  console.log("> " + __dirname + "\\loadProduct.js");

  //input
  if (await !checkInput(req.body))
    return res.json({ message: "Dont have type product" });
  console.log(req.body);
  //checkdb

  //main
  const { productInfor } = await queryProduct(req.body.values);

  console.log("...", await productInfor);

  res.json({ productInfor });
};

const checkInput = (data) => {
  var bool = true;

  if (!data || !data.values) {
    console.log("dont have values < 5");
    bool = false;
  }

  return bool;
};

const queryProduct = async (values) => {
  console.log("queryProduct...");

  let result = null;

  const getResult = (rows) => {
    result = rows;
  };

  await conn
    .promise()
    .query(`SELECT * FROM Product WHERE ProductType = '${values}'`)
    .then(([rows]) => {
      getResult(rows);
    });
  //   console.log(result);
  return { productInfor: result };
};

module.exports = loadProduct;
