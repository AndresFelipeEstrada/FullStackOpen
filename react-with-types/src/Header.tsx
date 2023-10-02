interface CourseName {
  courseName: string
}

const Header: React.FC<CourseName> = ({ courseName }) => {
  return (
    <h1>{courseName}</h1>
  )
}

export default Header
