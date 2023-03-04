import { Gender, NewPatient } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseStringParam = (text: unknown, paramName: string): string => {
  if (!isString(text)) {
    throw new Error(`Incorrect or missing ${paramName}`);
  }

  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect date: " + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect gender: " + gender);
  }
  return gender;
};

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: NewPatient = {
      name: parseStringParam(object.name, "name"),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseStringParam(object.ssn, "ssn"),
      gender: parseGender(object.gender),
      occupation: parseStringParam(object.occupation, "occupation"),
      entries: [],
    };

    return newPatient;
  }

  throw new Error("Incorrect data: a field missing");
};

export default toNewPatient;
