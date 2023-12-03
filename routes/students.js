const express = require("express"); // import - external
const { ObjectId } = require("mongodb");

const { db } = require("../utils/connectToDB");
const studentsController = require("../controllers/studentsController");
const verifyAuth = require("../middlewares/verifyAuth");

const studentsRouter = express.Router();

// GET all
studentsRouter.get("/", verifyAuth, studentsController.getStudents);

// GET with id
studentsRouter.get("/:id", studentsController.getStudentById);

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
