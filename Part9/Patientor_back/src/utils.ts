import { NewPatient, Gender } from "./types";

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
const toNewPatient = (object: any): NewPatient => {
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

export default toNewPatient;
