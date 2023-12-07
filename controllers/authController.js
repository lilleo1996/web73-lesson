const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { db } = require("../utils/connectToDB");

const register = async (req, res) => {
  const { name, password } = req.body;

  const checkExistedName = async () => {
    const foudUserByName = await db.users.findOne({ name: name });
    if (foudUserByName) return true;
    return false;
  };

  if (await checkExistedName()) {
    res.json({ message: "Name already exists" });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = {
      name: name,
      password: hashedPassword,
    };
    db.users.insertOne(newUser);
    res.json({ message: "Register succesfully !", data: newUser });
  }
};

const login = async (req, res) => {
  // Create checkAcount function to check students account with name and age
  const { name, password } = req.body;
  const verifyUser = async () => {
    const foudUserByName = await db.users.findOne({ name: name });
    if (foudUserByName) {
      const isPasswordMatch = await bcrypt.compare(
        password,
        foudUserByName.password
      );
      return isPasswordMatch;
    }
    return false;
  };

  if (await verifyUser()) {
    const token = jwt.sign({ name: req.name }, "WEB73-LESSON");
    res.json({ user: req.body, token: token });
  } else {
    res.send("Wrong name or password");
  }
};

module.exports = { register, login };
