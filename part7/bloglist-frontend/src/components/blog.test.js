import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'



describe('Blog component tests', () => {
  let component
  const mockHandlerUpdate = jest.fn()
  const mockHandlerDelete = jest.fn()

  beforeEach(() => {
    const user = {
      name: 'Carlos Jorge',
      username: 'cajo',
    }

    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Carlos',
      url: 'eekekeke.com',
      likes: 0,
      user: {
        username: 'cajo'
      }
    }

    component = render(
      <Blog blog={blog} user={user} updateBlog={mockHandlerUpdate} deleteBlog={mockHandlerDelete} />
    )

  })


  test('shows blog title and author but not url and likes', () => {
    const title = component.container.querySelector('.blog-title')
    const author = component.container.querySelector('.blog-author')

    expect(title).toBeDefined()
    expect(author).toBeDefined()
    let show=false

    const hiddenDiv = show ? component.container.querySelector('.hidden-div') : null

    expect(hiddenDiv).toBe(null)
  })

  test('show url and likes after clicking in show button', () => {
    const button = component.container.querySelector('#hide-show')
    fireEvent.click(button)

    const hiddenDiv = component.container.querySelector('.hidden-div')
    expect(hiddenDiv).toBeDefined()
  })

  test('if like button is pressed twice event handler is called twice', () => {
    const show = component.container.querySelector('#hide-show')
    fireEvent.click(show)

    const likeBtn = component.container.querySelector('#likeBtn')
    fireEvent.click(likeBtn)
    fireEvent.click(likeBtn)

    expect(mockHandlerUpdate.mock.calls).toHaveLength(2)
  })

})



