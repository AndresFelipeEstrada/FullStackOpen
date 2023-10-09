/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Gender, type NewPatient } from '../types/Patients.types'

const isString = (string: any): boolean => {
  return typeof string === 'string' || string instanceof string
}

const isGender = (gender: any): boolean => {
  return Object.values(Gender).includes(gender)
}

const parseOccupation = (occupationFromRequest: any): string => {
  if (!(occupationFromRequest) || !isString(occupationFromRequest)) {
    throw new Error('Incorrect or missing occupation')
  }
  return occupationFromRequest
}

const parseGender = (genderFromRequest: any): Gender => {
  if (!genderFromRequest || !isString(genderFromRequest) || !isGender(genderFromRequest)) {
    throw new Error('Incorrect or missing gender')
  }
  return genderFromRequest
}

const parseSsn = (ssnFromRequest: any): string => {
  if (!ssnFromRequest || !isString(ssnFromRequest)) {
    throw new Error('Incorrect or missing ssn')
  }
  return ssnFromRequest
}

const parseDateOfBirth = (dateFromRequest: any): string => {
  if (!dateFromRequest || !isString(dateFromRequest)) {
    throw new Error('Incorrect or missing date of birth')
  }
  return dateFromRequest
}

const parseName = (nameFromRequest: any): string => {
  if (!nameFromRequest || !isString(nameFromRequest)) {
    throw new Error('Incorrect or missing name')
  }
  return nameFromRequest
}

export const validatePatients = (object: any): NewPatient => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: []
  }
}
