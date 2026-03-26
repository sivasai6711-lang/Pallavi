const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://Saipallavi:Pallavi4311@ac-lyb7rxa-shard-00-00.p3ahbvf.mongodb.net:27017,ac-lyb7rxa-shard-00-01.p3ahbvf.mongodb.net:27017,ac-lyb7rxa-shard-00-02.p3ahbvf.mongodb.net:27017/?ssl=true&replicaSet=atlas-niknj7-shard-0&authSource=admin&appName=Cluster0")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  event: String
});

const User = mongoose.model("User", userSchema);

// POST API
app.post("/register", async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();

  res.json({ message: "Saved to Database!" });
});

// GET API
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});