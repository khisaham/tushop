const express = require("express");
const router = express.Router();
const { maximizeProfit } = require("../services/maximum-profit.service.handler.js");
const { distributeGoodies } = require("../services/distribution.service.handler.js");

router.post("/maximize-profit", (req, res) => {
  const { jobs } = req.body;

  if (!jobs || !Array.isArray(jobs)) {
    return res.status(400).json({ error: "Invalid input, jobs must be an array" });
  }
  const { tasks_for_others, earnings_for_others } = maximizeProfit(jobs);
  res.json({
    tasks_for_others,
    earnings_for_others,
  });
  
});


router.post("/goodies", async (req, res) => {
  const { inputFilePath, outputFilePath, numEmployees } = req.body;

  if (!inputFilePath || !outputFilePath || !numEmployees) {
    return res.status(400).json({ error: "Please provide inputFilePath, outputFilePath, and numEmployees" });
  }

  try {
    const result = await distributeGoodies(inputFilePath, outputFilePath, numEmployees);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
