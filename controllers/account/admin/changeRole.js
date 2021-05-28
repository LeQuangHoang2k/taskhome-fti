const { conn } = require("../../../data/connect");

const changeRole = async (req, res) => {
  console.log("> " + __dirname + "\\changeRole.js");

  //input
  console.log("a", req.body);
  if (await !checkInput(req.body))
    return res.json({ message: "No input or content lenght < 5" });

  //check db
  // const { accountInfor } = await getInforAccount(req.body);

  if ((await checkExistAccount(req.body)) === false)
    return res.json({ message: "Account not existed" });

  //main
  await updateRoleAccount(req.body);

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
    data.id.length <= 0 ||
    (data.role !== "user" && data.role !== "admin")
  ) {
    console.log("No input");
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

const checkExistAccount = async (data) => {
  let result = null;

  const getResult = (rows) => {
    result = rows;
  };

  await conn
    .promise()
    .query(`SELECT * FROM Account WHERE AccountId = ${parseInt(data.id)}`)
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

const updateRoleAccount = async (data) => {
  await conn
    .promise()
    .query(
      `UPDATE Account SET AccountRole = '${
        data.role
      }' WHERE AccountId = ${parseInt(data.id)}`
    )
    .then(([rows]) => {
      //   getResult(rows);
    });
};

module.exports = changeRole;
