const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const router = express.Router();

const app = express();
app.use(express.json());

require("dotenv").config({ path: "./config/.env" });

const MONGODB_URI = process.env.MONGODB_URI;

// Connect database "restApi" locally
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("database connected with success!!!");
  } catch (error) {
    console.log(error);
  }
};
connectDB();

const PORT = process.env.PORT;

// start the server in the port ${PORT} !
app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`app listening on port ${PORT}`);
});

app.use("/users", router);

// Get all users
router.get("/allUsers", async (req, res) => {
  const allUsers = await User.find({});
  res.send(allUsers);
});

// Add a new user to the database
router.post("/add", async (req, res) => {
  try {
    const newUser = new User({ ...req.body });
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    console.log(error);
  }
});

// Edit a user by id
router.put("/update", async (req, res) => {
  await User.findByIdAndUpdate(
    req.query._id,
    req.body,
    { new: true },
    (err, doc) => {
      if (err) {
        return res.send(err);
      }
      res.send(doc);
    }
  );
});

// Remove a user by id
router.delete("/remove", async (req, res) => {
  await User.findByIdAndRemove(req.query._id, async (err, result) => {
    if (err) {
      return res.send(err);
    }
    const allUsers = await User.find({});
    res.send(allUsers);
  });
});
