const { MongoClient } = require("mongodb");

// Connect MongoDB URL
const mongoDBUrl = "mongodb://localhost:27017";
const client = new MongoClient(mongoDBUrl);

// Database Name
const dbName = "web73_preparation";
const db = {};

const connectToDB = async () => {
  await client.connect();
  console.log("Connected successfully to database");
  const database = client.db(dbName);
  db.students = database.collection("students");
  //   db.teachers = database.collection("teachers");
};

module.exports = { connectToDB, db };
