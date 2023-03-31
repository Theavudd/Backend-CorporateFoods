const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const Users = require("../../Users");

router.get("/", (req, res) => {
  res.json(Users);
});

router.get("/:id", (req, res) => {
  const found = Users.some((element) => element.id === parseInt(req.params.id));
  if (found) {
    res.json(Users.filter((element) => element.id === parseInt(req.params.id)));
  } else {
    res.sendStatus(400);
  }
});

router.post("/", (req, res) => {
  if (Users.findIndex((element) => element.email === req.body.email) != -1) {
    res.sendStatus(400).send({ message: "User already exists" });
  }
  const newUser = {
    id: uuid.v1(),
    name: req?.body?.name,
    email: req.body?.email,
  };
  if (Users.findIndex((element) => element.email === newUser.email) !== -1) {
    res.sendStatus(400).statusMessage("User already Exists");
  }
  if (!newUser.name) {
    return res.sendStatus(400).send({ message: "Name field is mandatory" });
  }
  if (!newUser.email) {
    return res.sendStatus(400).send({ message: "Email field is mandatory" });
  }
  Users.push(newUser);
  res.json(Users);
});

module.exports = router;
