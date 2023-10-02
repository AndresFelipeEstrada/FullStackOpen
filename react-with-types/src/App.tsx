import './App.css'
import Content from './Content'
import Header from './Header'
import Total from './Total'
import { type CourseParts } from './types'

function App () {
  const courseName = 'Half Stack application development'

  const courseParts: CourseParts[] = [
    { name: 'Fundamentals', exerciseCount: 10, description: 'This is an awesome course part' },
    { name: 'Using props to pass data', exerciseCount: 7, groupProjectCount: 3 },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev'
    },
    { name: 'OtroCurso', exerciseCount: 10, description: 'Cuarto curso de algo', duration: 50 }
  ]

  const totalExerciseCount = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0)

  return (
    <>
      <div>
        <Header courseName={courseName} />
        <Content courseParts={courseParts}/>
        <Total exerciseCount={totalExerciseCount} />
      </div>
    </>
  )
}

export default App
