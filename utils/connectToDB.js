const { MongoClient } = require("mongodb");

// Connect MongoDB URL
// const mongoDBUrl = "mongodb://localhost:27017";
const mongoDBUrl = "mongodb+srv://user1:user1@cluster0.o8okbmq.mongodb.net/";
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
