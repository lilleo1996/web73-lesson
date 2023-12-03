const express = require("express"); // import - external

const STUDENTS = require("../mock/students");

const authRouter = express.Router();

authRouter.post("/login", (req, res) => {
  // Create checkAcount function to check students account with name and age
  const checkAccount = (account) => {
    const foudAccount = STUDENTS.find(
      (student) => student.name == account.name && student.age == account.age
    );
    if (foudAccount) return true;
    return false;
  };

  if (checkAccount(req.body)) {
    const token = jwt.sign({ name: req.name }, "WEB73-LESSON");
    res.json({ user: req.body, token: token });
  } else {
    res.send("Wrong name or age");
  }
});

module.exports = authRouter;
