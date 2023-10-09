import { type NewPatient, type PatientSensitive, type Patient, type newEntry } from '../types/Patients.types'
import patients from '../data/patients'
import crypto from 'crypto'

export const getAllPatients = (): PatientSensitive[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth: `${dateOfBirth}`,
    gender,
    occupation
  }))
}

export const createNewPatient = (newPatient: NewPatient): Patient => {
  const newEntry = {
    id: crypto.randomUUID(),
    name: newPatient.name,
    dateOfBirth: newPatient.dateOfBirth,
    ssn: newPatient.ssn,
    gender: newPatient.gender,
    occupation: newPatient.occupation,
    entries: []
  }

  patients.push(newEntry)

  return newEntry
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getOnePatient = (id: string): Patient | undefined => {
  const patient = patients.find(patient => patient.id === id)

  return patient
}

export const createNewEntry = (id: string, entry: newEntry): Patient | string | undefined => {
  const patient = patients.find(patient => patient.id === id)

  if (patient == null) {
    return 'PATIENT NOT FOUND'
  }

  const newEntryData = {
    id: crypto.randomUUID(),
    ...entry
  }

  patient.entries.push(newEntryData)

  return patient
}
