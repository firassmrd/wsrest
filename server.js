const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config({ path: "config/.env" });
app.use(express.json());
let port = process.env.PORT;

let uri = process.env.URI;

mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) throw err;
    console.log("connected to database");
  }
);

const instanceUser = new User({
  Name: "firas",
  Email: "aeaeaeaeae@gmail.com",
  phone: 55253197,
  age: 55,
});
instanceUser.save((err, data) => {
  if (err) throw err;
  console.log(data);
});

User.create([
  { Name: "sidi", Email: "ededed@gmail.com", phone: 48585858, age: 88 },
  { Name: "azze", Email: "zezeze@gmail.com", phone: 84848, age: 33 },
  { Name: "cdcdcd", Email: "cdcdcd@gmail.com", phone: 5588, age: 989 },
  { Name: "diikikikik", Email: "kikikkikik@gmail.com", phone: 55555, age: 120 },
]);

app.get("/", (req, res) => {
  res.send("WELCOME TO MY APP");
});

//   GET :  RETURN ALL USERS
app.get("/users", (req, res) => {
  User.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

// POST :  ADD A NEW USER TO THE DATABASE
app.post("/add-user", (req, res) => {
  let newUser = req.body;
  User.create([newUser])
    .then((result) => res.send(result))
    .catch((err) => console.log("err", err));
});

// PUT : EDIT A USER BY ID
app.put("/edit-user/:id", (req, res) => {
  let userID = req.params.id;
  let body = req.body;
  User.updateOne({ _id: userID }, { $set: body }, { strict: true }, (err) => {
    if (err) throw err;
  })
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

// DELETE : REMOVE A USER BY ID
app.delete("/delete-user/:id", (req, res) => {
  let userID = req.params.id;
  console.log(typeof userID);
  User.remove({ _id: userID }, (err) => {
    if (err) throw err;
  })
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.listen(port, () => {
    console.log('connected');
})
