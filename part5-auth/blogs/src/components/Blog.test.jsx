import { beforeEach, expect } from 'vitest'
import { render, screen, fireEvent } from "@testing-library/react"
import Blog from './Blog'

const blog = {
  title: 'Mi dia a dia',
  author: 'Andres',
  url: 'www.facebook.com',
  like: 1
}
let component
beforeEach(() => {
  const updateLikes = () => { }
  const deleteBlog = () => { }
  component = render(
    <Blog blog={blog} updateLikes={updateLikes} deleteBlog={deleteBlog} />
  )
})

test('<Blog/> render blog', () => {
  expect(screen.getByText('Mi dia a dia')).toBeDefined();
  expect(screen.getByText('Andres')).toBeDefined();
  expect(component.container.getElementsByClassName('hidden-content').length).toBe(0)
})


test('<Blog/> not render url and likes', () => {
  const button = screen.getByText('View')
  fireEvent.click(button)

  expect(screen.queryByText('www.facebook.com')).toBeDefined()
})
