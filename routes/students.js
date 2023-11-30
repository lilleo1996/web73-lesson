const express = require("express"); // import - external
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");

const { db } = require("../utils/connectToDB");

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
studentsRouter.get("/", verifyAuth, async (req, res) => {
  const students = await db.students.find({}).toArray();
  res.json({
    message: "Get successfully",
    data: students,
  });
});

// GET with id
studentsRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const student = await db.students.findOne({
    _id: new ObjectId(id),
  });
  res.json({
    message: "Get successfully",
    data: student,
  });
});

// POST new
studentsRouter.post("/", async (req, res) => {
  const { name, age } = req.body;
  const newStudent = {
    name: name,
    age: age,
    type: "student",
  };
  await db.students.insertOne(newStudent);
  res.json({
    message: "Create successfully",
    data: newStudent,
  });
});

// PUT with id
studentsRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, age, type } = req.body;
  await db.students.updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $set: {
        name: name,
        age: age,
        type: type,
      },
    }
  );
  res.json({
    message: "Update successfully",
    data: { ...req.body, _id: id },
  });
});

// DELETE with id
studentsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await db.students.deleteOne({
    _id: new ObjectId(id),
  });
  res.json({
    message: "Delete successfully",
    data: { _id: id },
  });
});

module.exports = studentsRouter;
