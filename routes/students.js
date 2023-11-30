const express = require("express"); // import - external
const jwt = require("jsonwebtoken");

const STUDENTS = require("../mock/students"); // import - internal

const studentsRouter = express.Router();

const verifyAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "WEB73-LESSON");
    if (decoded) {
      next();
    }
  } catch (err) {
    res.send("Invalid token");
  }
};

// GET all
studentsRouter.get("/", verifyAuth, (req, res) => {
  res.json(STUDENTS);
});

// GET with id
studentsRouter.get("/:id", (req, res) => {
  const student = STUDENTS.find((student) => student.id == req.params.id);

  if (!student)
    res.json({
      message: "Fail",
      data: null,
    });
  else
    res.json({
      message: "Success",
      data: student,
    });
});

// POST new
studentsRouter.post("/", (req, res) => {
  const { name, age } = req.body;
  const student = {
    id: STUDENTS.length + 1,
    name,
    age,
  };

  STUDENTS.push(student);
  res.json({
    message: "Success",
    data: STUDENTS,
  });
});

// PUT with id
studentsRouter.put("/:id", (req, res) => {
  STUDENTS.forEach((student, index) => {
    if (student.id == req.params.id) {
      STUDENTS[index] = { ...STUDENTS[index], ...req.body };
    }
  });
  res.json({
    message: "Success",
    data: STUDENTS,
  });
});

// DELETE with id
studentsRouter.delete("/:id", (req, res) => {
  const studentIndex = STUDENTS.findIndex(
    (student) => student.id == req.params.id
  );

  if (studentIndex === -1) {
    res.json({
      message: "Resource is not exist",
    });
  } else {
    STUDENTS.splice(studentIndex, 1);
    res.json({
      message: "Delete successfully",
    });
  }
});

module.exports = studentsRouter;
