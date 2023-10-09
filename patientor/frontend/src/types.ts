export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

interface BaseEntry {
  id: string
  date: string
  type: string
  specialist: string
  description: string
  diagnosisCodes?: Array<Diagnosis['code']>
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
  sickLeave: sickLeave
}

interface OccupationalHealthCareEntry extends BaseEntry {
  discharge?: discharge
}

export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthCareEntry;

export interface Patient {
  id: string
  name: string
  dateOfBirth: string
  ssn: string
  gender: Gender
  occupation: string
  entries: Entry[]
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;
export type NewEntry = Omit<Entry, 'id'>;

