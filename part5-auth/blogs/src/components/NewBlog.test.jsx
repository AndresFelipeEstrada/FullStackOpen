import { beforeEach, expect, vi } from 'vitest'
import { render, screen, fireEvent } from "@testing-library/react"
import NewBlog from "./NewBlog";

describe('<NewBlog/>', () => {
  const blog = {
    title: 'Mi dia a dia',
    author: 'Andres',
    url: 'www.facebook.com',
    like: 1
  }
  let component
  const createBlog = vi.fn()

  beforeEach(() => {
    component = render(
      <NewBlog createBlog={createBlog} />
    )
  })

  test('New Blog', () => {
    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')
    const submit = component.container.querySelector('#submit')

    fireEvent.change(author, { target: { value: blog.author } })
    fireEvent.change(title, { target: { value: blog.title } })
    fireEvent.change(url, { target: { value: blog.url } })

    fireEvent.click(submit)

    expect(createBlog).toHaveBeenCalledWith({
      author: blog.author,
      title: blog.title,
      url: blog.url
    })
  })
})
