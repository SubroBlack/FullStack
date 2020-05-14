import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercise } from "./exerciseCalculator";
const app = express();
app.use(express.json());

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.get("/hello", (_req: any, res: any) => {
  res.send("Hello FullStack!!!");
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.get("/bmi", (req: any, res: any) => {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.post("/exercises", (req: any, res: any) => {
  try {
    const result = calculateExercise(req.body);
    res.json(result);
  } catch (e) {
    res.json({ error: e.message });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
