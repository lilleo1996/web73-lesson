const { ObjectId } = require("mongodb");

const { db } = require("../utils/connectToDB");

const getStudents = async (req, res) => {
  const students = await db.students
    .find({ $or: [{ age: { $lte: 18 } }, { age: { $gt: 20 } }] })
    .sort({ age: -1 })
    .toArray();
  res.json({
    message: "Get successfully",
    data: students,
  });
};

const getStudentById = async (req, res) => {
  const id = req.params.id;
  const student = await db.students.findOne({
    _id: new ObjectId(id),
  });
  res.json({
    message: "Get successfully",
    data: student,
  });
};

module.exports = { getStudents, getStudentById };
