import express from "express";
import toNewPatient from "../utils";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientService.getPatientsCensored());
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    res.json(patientService.addPatient(newPatient));
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
