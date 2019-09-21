const express = require('express');
const router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).send({ message: "OK" });
});

router.post("/signin", (req, res) => {
  if (req.body.username === "test" && req.body.password === "admin") {
    res.status(200).send({ token: "pizzaboi" });
    return;
  }
  res.status(400).send({ message: "Wrong log in" });
});

router.put("/dialog", (req, res) => {
  res.status(201).send({ message: "CREATED", body: req.body });
});

module.exports = router;
