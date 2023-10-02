import { Router } from 'express'
import { GetAllDiagnose } from '../services/diagnoses'

const diagnosesRoutes = Router()

diagnosesRoutes.get('/', (_, res) => {
  res.send(GetAllDiagnose())
})

diagnosesRoutes.post('/', (req, res) => {
  console.log(req.body)

  res.send('post')
})

export default diagnosesRoutes
