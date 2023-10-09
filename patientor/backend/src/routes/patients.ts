import { Router, type Request, type Response } from 'express'
import { createNewEntry, createNewPatient, getAllPatients, getOnePatient } from '../services/patients'
import { validatePatients } from '../utils/validatePatients'
import { validateEntries } from '../utils/validateEntries'

const patientsRouter = Router()

patientsRouter.get('/', (_, res) => {
  res.send(getAllPatients())
})

patientsRouter.post('/', (req, res) => {
  try {
    const newPatient = validatePatients(req.body)

    createNewPatient(newPatient)

    res.status(201).json(newPatient)
  } catch (error) {
    if (error instanceof Error) { res.status(400).json({ message: error.message }) }
  }
})

patientsRouter.get('/:id', (req: Request, res: Response) => {
  try {
    const patient = getOnePatient(req.params.id)
    res.status(201).json(patient)
  } catch (error) {
    console.log(error)
  }
})

patientsRouter.post('/:id/entries', (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const body = { ...req.body }

    const newEntry = validateEntries(body)

    const createdEntry = createNewEntry(id, newEntry)
    res.status(200).json(createdEntry)
  } catch (error) {
    if (error instanceof Error) { res.status(400).json({ message: error.message }) }
  }
})

export default patientsRouter
