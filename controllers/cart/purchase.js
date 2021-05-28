const { conn } = require("../../data/connect");

const purchase = async (req, res) => {
  console.log("> " + __dirname + "\\purchase.js");

  //input
  if (await !checkInput(req.body))
    return res.json({ message: "Dont have type product" });
  console.log(req.body);

  //checkdb
  const { arrayProductId } = await getArrayProductId(req.body.carts);
  if (await !updateAmountProduct(req.body.carts, arrayProductId))
    return res.json({ message: "Cant not update product" });

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

const updateAmountProduct = async (carts, arrayProductId) => {
  //select id get current dbamount
  const { listCurrentProduct } = await selectCurrentAmountById(
    carts,
    arrayProductId
  );

  // console.log("listCurrentProduct", listCurrentProduct);

  //compare dbmount and amount product in carts

  const newProductAmount = await compareCurrentProductAndCarts(
    carts,
    listCurrentProduct,
    arrayProductId
  );
  if (!newProductAmount || newProductAmount.length === 0) return false;

  console.log("save");

  //save (dbmount- carts) where id
  await updateProduct(listCurrentProduct, newProductAmount, arrayProductId);

  return true;
};

const selectCurrentAmountById = async (carts, arrayProductId) => {
  // console.log("array id", arrayProductId);
  let listCurrentProduct = null;

  const getListCurrentProduct = (rows) => {
    listCurrentProduct = rows;
    // console.log(rows);
  };

  await conn
    .promise()
    .query(`SELECT * FROM Product WHERE ProductId IN (${arrayProductId})`)
    .then(([rows]) => {
      getListCurrentProduct(rows);
    });
  return { listCurrentProduct };
};

const getArrayProductId = (carts) => {
  var arrayProductId = [];

  carts.forEach((item) => {
    arrayProductId.push(parseInt(item.ProductId));
  });

  return { arrayProductId };
};

const compareCurrentProductAndCarts = async (
  carts,
  listCurrentProduct,
  arrayProductId
) => {
  var newProductAmount = [];
  console.log("compare : ", carts, listCurrentProduct);

  // var bool = true;

  // arrayProductId.forEach((item) => {
  //   if (carts.sum > listCurrentProduct.ProductAmount) return false;
  // });

  for (let i = 0; i < arrayProductId.length; i++) {
    if (carts[i].sum > listCurrentProduct[i].ProductAmount) return false;
    newProductAmount.push(
      parseInt(listCurrentProduct[i].ProductAmount) - parseInt(carts[i].sum)
    );
  }

  console.log("newProductAmount", newProductAmount);

  return newProductAmount;
};

const updateProduct = async (
  listCurrentProduct,
  newProductAmount,
  arrayProductId
) => {
  for (let i = 0; i < arrayProductId.length; i++) {
    await conn
      .promise()
      .query(
        `UPDATE Product SET ProductAmount = ${newProductAmount[i]} WHERE ProductId = ${arrayProductId[i]}`
      )
      .then(([rows]) => {});
  }

  console.log("update done...");
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
