import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import Note from './Note.jsx'

const note = {
  content: 'Component testing is done with react-testing-library',
  important: true
}

test('renders content', () => {
  const component = render(<Note note={note} />)

  // component.debug()

  expect(component.container).toHaveTextContent('Component testing is done with react-testing-library')
})

test('clicking the button call event handler once', () => {
  const mockHandler = jest.fn()

  const component = render(
    <Note note={note} toggleImportance={mockHandler} />
  )

  const button = component.getByText('make not important')
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})
