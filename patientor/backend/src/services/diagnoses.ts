import { type Diagnose } from '../types/Diagnose.types'
import DiagnoseData from '../data/diagnoses.json'

export const GetAllDiagnose = (): Diagnose[] => {
  return DiagnoseData
}
