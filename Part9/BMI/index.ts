import express from "express";
import { calculateBmi } from "./bmiCalculator";
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello FullStack!!!");
});

app.get("/bmi", (req, res) => {
  try {
    const bmi = calculateBmi(req.query.height, req.query.weight);
    const result = {
      weight: req.query.weight,
      height: req.query.height,
      bmi: bmi,
    };
    res.json(result);
  } catch (e) {
    res.json({ error: e.message });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
