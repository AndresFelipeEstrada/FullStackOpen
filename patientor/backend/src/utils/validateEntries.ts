/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { HealthCheckRating, type newEntry } from '../types/Patients.types'
import Dianoses from '../data/diagnoses.json'

const isString = (palabra: any): boolean => {
  return typeof palabra === 'string' || palabra instanceof String
}

const isNumber = (numero: any): boolean => {
  return typeof numero === 'number' || numero instanceof Number
}

const isHealthCheckRating = (rating: any): boolean => {
  return Object.values(HealthCheckRating).includes(rating)
}

const isDiagnosisCode = (code: string): boolean => {
  return Dianoses.some(diagnosis => diagnosis.code === code)
}

const parseDiagnosisCodes = (diagnosisCodesFromRequest: any[]): string[] => {
  if (!diagnosisCodesFromRequest?.every((code) => isDiagnosisCode(code))) {
    throw new Error('Incorrect or missing diagnosis code')
  }

  return diagnosisCodesFromRequest
}

const parseDescription = (descriptionFromRequest: any): string => {
  if (!descriptionFromRequest || !isString(descriptionFromRequest)) {
    throw new Error('Incorrect or missing description')
  }
  return descriptionFromRequest
}

const parseSpecialist = (specialistFromRequest: any): string => {
  if (!specialistFromRequest || !isString(specialistFromRequest)) {
    throw new Error('Incorrect or missing specialist')
  }
  return specialistFromRequest
}

const parseType = (typeFromRequest: any): string => {
  if (!typeFromRequest || !isString(typeFromRequest)) {
    throw new Error('Incorrect or missing type')
  }
  return typeFromRequest
}

const parseDate = (dateFromRequest: any): string => {
  if (!dateFromRequest || !isString(dateFromRequest)) {
    throw new Error('Incorrect or missing date')
  }
  return dateFromRequest
}

const parseHealthCheckRating = (healthCheckFromRequest: any): number => {
  if (!healthCheckFromRequest || !isNumber(healthCheckFromRequest) || !isHealthCheckRating(healthCheckFromRequest)) {
    throw new Error('Incorrect or missing HealthCheckRating')
  }
  return healthCheckFromRequest
}

const parseDischarge = (dischargeFromRequest: any): any => {
  if (!dischargeFromRequest.date || !isString(dischargeFromRequest.date)) {
    throw new Error('Incorrect or missing Discharge date')
  }

  if (!dischargeFromRequest.criteria || !isString(dischargeFromRequest.criteria)) {
    throw new Error('Incorrect or missing Discharge criteria')
  }
  return dischargeFromRequest
}

const parseSickLeave = (sickLeaveFromRequest: any): any => {
  if (!sickLeaveFromRequest.startDate || !isString(sickLeaveFromRequest.startDate)) {
    throw new Error('Incorrect or missing sickLeave startDate')
  }

  if (!sickLeaveFromRequest.endDate || !isString(sickLeaveFromRequest.endDate)) {
    throw new Error('Incorrect or missing sickLeave endDate')
  }

  return sickLeaveFromRequest
}

export const validateEntries = (object: any): newEntry => {
  const newEntry: any = {
    date: parseDate(object.date),
    type: parseType(object.type),
    specialist: parseSpecialist(object.specialist),
    description: parseDescription(object.description)
  }

  if (object.diagnosisCodes !== undefined) {
    newEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes)
  }

  if (object.type === 'HealthCheck') {
    newEntry.healthCheckRating = parseHealthCheckRating(object.healthCheckRating)
  }

  if (object.type === 'Hospital') {
    newEntry.discharge = parseDischarge(object.discharge)
  }

  if (object.type === 'OccupationalHealthcare') {
    newEntry.sickLeave = parseSickLeave(object.sickLeave)
  }
  return newEntry
}
