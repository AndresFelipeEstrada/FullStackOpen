import { type Diagnose } from './Diagnose.types'

export enum Gender {
  Female = 'female',
  Male = 'male',
}

interface BaseEntry {
  id: string
  date: string
  type: string
  specialist: string
  description: string
  diagnosisCodes?: Array<Diagnose['code']>
  employerName?: string
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck'
  healthCheckRating: HealthCheckRating
}

interface sickLeave {
  startDate: string
  endDate: string
}
interface discharge {
  date: string
  criteria: string
}

interface HospitalEntry extends BaseEntry {
  discharge?: discharge
}

interface OccupationalHealthCareEntry extends BaseEntry {
  sickLeave: sickLeave
}

export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthCareEntry

export interface Patient {
  id: string
  name: string
  dateOfBirth: string
  ssn: string
  gender: Gender
  occupation: string
  entries: Entry[]
}

export type NewPatient = Omit<Patient, 'id'>
export type newEntry = Omit<Entry, 'id'>
export type PatientSensitive = Omit<Patient, 'ssn' | 'entries'>
