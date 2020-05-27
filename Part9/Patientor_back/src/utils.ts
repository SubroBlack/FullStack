import {
  NewPatient,
  Gender,
  Entry,
  HospitalEntry,
  HealthCheckEntry,
  OccupationalHealthCareEntry,
  Discharge,
  HealthCheckRating,
} from "./types";
import { v4 as uuid } from "uuid";

// TO check if the given text is string
/* eslint-disable @typescript-eslint/no-explicit-any */
const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

// TO check if the given given input is a valid string
/* eslint-disable @typescript-eslint/no-explicit-any */
const parseStringInput = (input: any, inputName: string): string => {
  if (!input || !isString(input)) {
    throw new Error(`Incorrect or missing ${inputName}: ${input}`);
  }
  return input;
};

// TO check if the given string is date
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// To check if the given input is valid date string
const parseDate = (date: any, dateName: string): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing ${dateName}: ${date}`);
  }
  return date;
};

// to check if the given input is gender
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

// TO parse the Gender
const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseStringInput(object.name, "name"),
    dateOfBirth: parseDate(object.dateOfBirth, "Date of Birth"),
    ssn: parseStringInput(object.ssn, "Social Security Number"),
    gender: parseGender(object.gender),
    occupation: parseStringInput(object.occupation, "Occupation"),
    entries: [],
  };
  return newPatient;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const parseDischarge = (discharge: any): Discharge => {
  const dischargeObj = {
    date: parseDate(discharge.date, "Date of discharge"),
    criteria: parseStringInput(discharge.criteria, "Criteria for Discharge"),
  };
  return dischargeObj;
};

// to check if the given input is HealthRating
const isHealthRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

// TO parse the HealthRating
const parseHealthRating = (healthcheckrating: any): HealthCheckRating => {
  if (!healthcheckrating || !isHealthRating(healthcheckrating)) {
    throw new Error(
      "Incorrect or missing HealthCheck Rating: " + healthcheckrating
    );
  }
  return healthcheckrating;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const isHospitalEntry = (object: any): HospitalEntry => {
  const newEntry: HospitalEntry = {
    id: uuid(),
    date: parseDate(object.date, "Date"),
    description: parseStringInput(object.description, "Description of Entry"),
    type: "Hospital",
    diagnosisCodes: object.diagnosisCodes ? object.diagnosisCodes : null,
    specialist: parseStringInput(object.specialist, "Specialist"),
    discharge: parseDischarge(object.discharge),
  };
  return newEntry;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const isHealthCheck = (object: any): HealthCheckEntry => {
  const newEntry: HealthCheckEntry = {
    id: uuid(),
    date: parseDate(object.date, "Date"),
    description: parseStringInput(object.description, "Description of Entry"),
    type: "HealthCheck",
    diagnosisCodes: object.diagnosisCodes ? object.diagnosisCodes : [],
    specialist: parseStringInput(object.specialist, "Specialist"),
    healthCheckRating: parseHealthRating(object.healthCheckRating),
  };
  return newEntry;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const isOccupationalHealthcareEntry = (
  object: any
): OccupationalHealthCareEntry => {
  const newEntry: OccupationalHealthCareEntry = {
    id: uuid(),
    date: parseDate(object.date, "Date"),
    description: parseStringInput(object.description, "Description of Entry"),
    type: "OccupationalHealthcare",
    diagnosisCodes: object.diagnosisCodes ? object.diagnosisCodes : null,
    specialist: parseStringInput(object.specialist, "Specialist"),
    employerName: parseStringInput(object.employerName, "Employer Name"),
  };
  return newEntry;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const toNewEntry = (object: any): Entry => {
  try {
    if (object.type === "Hospital") {
      return isHospitalEntry(object);
    } else if (object.type === "HealthCheck") {
      return isHealthCheck(object);
    } else if (object.type === "OccupationalHealthcare") {
      return isOccupationalHealthcareEntry(object);
    } else {
      throw new Error(`Invalid Submission: ${object}`);
    }
  } catch (error) {
    throw new Error(`Invalid Entry Type: ${error}`);
  }
};
