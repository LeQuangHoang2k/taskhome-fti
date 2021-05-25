const register = (req, res) => {
  console.log("> " + __dirname + "\\register");
  // console.log(req.body);

  res.json({ message: "success" });
};

module.exports = register;
