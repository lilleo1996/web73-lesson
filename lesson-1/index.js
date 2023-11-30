const express = require("express"); // import - external
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const studentsRouter = require("./routes/students");
const teachersRouter = require("./routes/teachers");
const STUDENTS = require("./mock/students");

const app = express(); // create express app
const port = 3001;

const logRequestTime = (req, res, next) => {
  console.log("New req at ", new Date());
  next();
};

const requireAPIKey = (req, res, next) => {
  if (!req.query.apiKey) {
    res.send("API key is missing");
    return;
  } else {
    next();
  }
};

app.use(bodyParser.json());
app.use(logRequestTime);

app.use("/students", studentsRouter);
app.use("/teachers", teachersRouter);

app.post("/login", (req, res) => {
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

app.listen(port, () => {
  console.log(`Listenning on port ${port}`); // listen on port
});
