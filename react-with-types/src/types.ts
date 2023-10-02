interface CoursePartBase {
  name: string
  exerciseCount: number
}

interface NewInterface extends CoursePartBase {
  description: string
}

interface CoursePartOne extends NewInterface {
  name: 'Fundamentals'
}

interface CoursePartTwo extends CoursePartBase {
  name: 'Using props to pass data'
  groupProjectCount: number
}

interface CoursePartThree extends NewInterface {
  name: 'Deeper type usage'
  exerciseSubmissionLink: string
}

interface CoursePartFour extends NewInterface {
  name: 'OtroCurso'
  duration: number
}

export type CourseParts = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour
