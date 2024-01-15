import { beforeEach, expect, vi } from 'vitest'
import { render, screen, fireEvent } from "@testing-library/react"
import Blog from './Blog'

describe('<Blog/>', () => {
  const blog = {
    title: 'Mi dia a dia',
    author: 'Andres',
    url: 'www.facebook.com',
    like: 1
  }
  let component
  const updateLikes = vi.fn()
  const deleteBlog = () => { }

  beforeEach(() => {
    component = render(
      <Blog blog={blog} updateLikes={updateLikes} deleteBlog={deleteBlog} />
    )
  })

  test('render blog', () => {
    expect(screen.getByText('Mi dia a dia')).toBeDefined();
    expect(screen.getByText('Andres')).toBeDefined();
    expect(component.container.getElementsByClassName('hidden-content').length).toBe(0)
  })

  test('not render url and likes', () => {
    const button = screen.getByText('View')
    fireEvent.click(button)

    expect(screen.queryByText('www.facebook.com')).toBeDefined()
  })

  test('like button', () => {
    const viewButton = screen.getByText('View')
    fireEvent.click(viewButton)

    const likeButton = screen.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(updateLikes).toHaveBeenCalledTimes(2)
  })
})
