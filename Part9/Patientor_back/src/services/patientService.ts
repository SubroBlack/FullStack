import patientData from "../../data/patients";
import { Patients, PatientsCensored } from "../types";

const getPatients = (): Patients[] => {
  return patientData;
};

const getPatientsCensored = (): PatientsCensored[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getPatients,
  getPatientsCensored,
};
