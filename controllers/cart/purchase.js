const { conn } = require("../../data/connect");

const purchase = async (req, res) => {
  console.log("> " + __dirname + "\\purchase.js");

  //input
  if (await !checkInput(req.body))
    return res.json({ message: "Dont have type product" });
  console.log(req.body);

  //checkdb

  //main
  const { result } = await saveCart(req.body.carts, req.body.id);
  await saveOrderDetail(req.body.carts, result.insertId);

  //   console.log("....aa", result.insertId);
  //res
};

const checkInput = (data) => {
  var bool = true;

  if (!data || data === []) {
    console.log("no input");
    bool = false;
  }

  return bool;
};

const saveCart = async (carts, id) => {
  let result = null;

  const getResult = (rows) => {
    result = rows;
  };

  await conn
    .promise()
    .query(`INSERT INTO Cart (AccountId) VALUES (${id});`)
    .then(([rows]) => {
      //   console.log(rows);
      getResult(rows);
    });
  //   console.log(result.insertId);
  return { result };
};

const saveOrderDetail = async (carts, cartId) => {
  let result = null;

  const getResult = (rows) => {
    result = rows;
  };

  carts.forEach(async (item) => {
    await conn
      .promise()
      .query(
        `INSERT INTO OrderDetail (CartId,ProductId,Amount) VALUES (${cartId},${item.ProductId},${item.sum});`
      )
      .then(([rows]) => {
        //   console.log(rows);
        // getResult(rows);
      });
  });

  //   console.log(result.insertId);
  //   return { result };
};

module.exports = purchase;
