import { type CourseParts } from './types'

const Content: React.FC<{ courseParts: CourseParts[] }> = ({ courseParts }) => {
  const asserNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)} `
    )
  }

  return (
    <>
      {courseParts.map((part, index) => {
        switch (part.name) {
          case 'Fundamentals':
            return (
              <p key={index}>
                {part.name} {part.exerciseCount} {part.exerciseCount} {part.description}
              </p>
            )
          case 'Using props to pass data':
            return (
              <p key={index}>
                {part.name} {part.exerciseCount} {part.groupProjectCount}
              </p>
            )
          case 'Deeper type usage':
            return (
              <p key={index}>
                {part.name} {part.exerciseCount} {part.description} {part.exerciseSubmissionLink}
              </p>
            )
          case 'OtroCurso':
            return (
                <p key={index}>
                  {part.name} {part.exerciseCount} {part.description} {part.duration}
                </p>
            )
          default:
            return asserNever(part)
        }
      })}
    </>
  )
}

export default Content
