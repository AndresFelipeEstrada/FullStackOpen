import express from 'express'
import diariesRouter from './routes/diaries'
import cors from 'cors'
import diagnosesRoutes from './routes/diagnoses'
import patientsRouter from './routes/patients'

const app = express()
app.use(express.json())
app.use(cors())

const PORT = 3001

app.get('/api/ping', (_, res) => {
  res.send('Hello Full Stack')
})

app.use('/api/diaries', diariesRouter)
app.use('/api/diagnoses', diagnosesRoutes)
app.use('/api/patients', patientsRouter)

app.listen(PORT, () => {
  console.log(`Server listen on port http://localhost:${PORT}`)
})
