const { conn } = require("../../data/connect");

const loadData = async (req, res) => {
  console.log("> " + __dirname + "\\loadData.js");

  const { productInfor } = await queryProduct();

  console.log("...",await productInfor);

  res.json({ productInfor });
};

const queryProduct = async () => {
  console.log("queryProduct...");

  let result = null;

  const getResult = (rows) => {
    result = rows;
  };

  await conn
    .promise()
    .query(`SELECT * FROM Product WHERE ProductType = 'phone'`)
    .then(([rows]) => {
      getResult(rows);
    });
  //   console.log(result);
  return { productInfor: result };
};

module.exports = loadData;
