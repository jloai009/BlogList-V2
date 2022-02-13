import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {

  const sampleBlog = {
    id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: {
      id: '618ab58362b498e06280ff7f',
      name: 'Jose',
      username: 'Jose',
    }
  }

  let component
  let handleLike

  beforeEach(() => {
    handleLike = jest.fn()
    component = render(
      <Blog
        blog={sampleBlog}
        user={{}}
        handleLike={handleLike}
      />
    )
  })

  test('at start the title and author are displayed', () => {
    const div = component.container.querySelector('.blog')

    expect(div).toHaveTextContent('Go To Statement Considered Harmful')
    expect(div).toHaveTextContent('Edsger W. Dijkstra')
  })

  test('at start the url and likes are not displayed', () => {
    const div = component.container.querySelector('.blog')

    expect(div).not.toHaveTextContent('http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html')
    expect(div).not.toHaveTextContent('Likes')
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('View')
    fireEvent.click(button)

    const div = component.container.querySelector('.blog')

    expect(div).toHaveTextContent('http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html')
    expect(div).toHaveTextContent('Likes')
  })

  test('if the like button is clicked twice, handleLike is called twice', () => {
    const viewButton = component.getByText('View')
    fireEvent.click(viewButton)
    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(handleLike.mock.calls).toHaveLength(2)
  })
})