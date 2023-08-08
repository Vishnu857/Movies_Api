
const projctmodule = require("../model/ProjectModel");
const express = require("express");
const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const project = await projctmodule.find({});
    res.send(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/add", async (req, res) => {
  try {
    var newProj = await projctmodule.create(req.body);
    res.send(newProj);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
