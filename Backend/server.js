const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = "mongodb+srv://Saipallavi:Pallavi4311@cluster0.p3ahbvf.mongodb.net/eventDB?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
.then(() => {
  console.log("✅ MongoDB Connected");
})
.catch((err) => {
  console.log("❌ MongoDB Error:", err);
});

// Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  event: String
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

// Test route
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// Register API
app.post("/register", async (req, res) => {
  try {
    const { name, email, phone, event } = req.body;

    if (!name || !email || !phone || !event) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = new User({ name, email, phone, event });
    await user.save();

    res.json({ message: "Registration successful!" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});