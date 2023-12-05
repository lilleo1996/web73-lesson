const jwt = require("jsonwebtoken");

const { db } = require("../utils/connectToDB");

const login = (req, res) => {
  // Create checkAcount function to check students account with name and age
  const checkAccount = (account) => {
    const foudAccount = db.students.findOne({
      $and: [{ name: account.name }, { age: account.age }],
    });
    if (foudAccount) return true;
    return false;
  };

  if (checkAccount(req.body)) {
    const token = jwt.sign({ name: req.name }, "WEB73-LESSON");
    res.json({ user: req.body, token: token });
  } else {
    res.send("Wrong name or age");
  }
};

module.exports = { login };
