import { Router, Request, Response } from 'express'
import { getAllDiaries, addNewDiary, getById } from '../services/diaries'
import { validateDaries } from '../utils/validateDiaries'

const diariesRouter = Router()

diariesRouter.get('/', (_, res) => {
  res.send(getAllDiaries())
})

diariesRouter.post('/', (req: Request, res: Response) => {
  try {
    const newDiaryEntry = validateDaries(req.body)

    addNewDiary(newDiaryEntry)

    res.status(201).json(newDiaryEntry)
  } catch (error) {
    if (error instanceof Error) { res.status(400).json({ message: error.message }) }
  }
})

diariesRouter.get('/:id', (req, res) => {
  const { id } = req.params
  const diary = getById(+id)

  if (diary == null) return res.status(400).json({ error: 'Diary not found' })

  return res.send(diary)
})

export default diariesRouter
