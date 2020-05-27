import express from "express";
import { toNewPatient, toNewEntry } from "../utils";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientService.getPatientsCensored());
});

router.get("/:id", (req, res) => {
  res.json(patientService.getPatient(req.params.id));
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    res.json(patientService.addPatient(newPatient));
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    res.json(patientService.addEntry(newEntry, req.params.id));
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
