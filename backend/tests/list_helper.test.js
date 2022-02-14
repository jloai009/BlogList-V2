const listHelper = require('../utils/list_helper')
const listWithOneBlog = require('./test_helper').listWithOneBlog
const blogs = require('./test_helper').listWithBlogs

describe('total likes', () => {
  test('when list is empty, equals 0', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has many blogs, equals the total likes', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('when list is empty, returns null', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(null)
  })

  test('when list has only one blog, returns that blog object', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })

  test(
    'when list has many blogs, returns the blog object with the most likes',
    () => {
      const result = listHelper.favoriteBlog(blogs)
      expect(result.likes).toBe(12)
    }
  )
})

describe('mostBlogs', () => {
  test('when list is empty, returns { "author": null, "blogs": 0 }', () => {
    const result = listHelper.mostBlogs([])
    expect(result.author).toBe(null)
    expect(result.blogs).toBe(0)
  })

  test(
    'when list has only one blog, returns { "author": blog.author, "blogs": 1 }',
    () => {
      const result = listHelper.mostBlogs(listWithOneBlog)
      expect(result.author).toBe(listWithOneBlog[0].author)
      expect(result.blogs).toBe(1)
    }
  )

  test('when list has many blogs, returns the expected object', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result.author).toBe('Robert C. Martin')
    expect(result.blogs).toBe(3)
  })
})

describe('mostLikes', () => {
  test('when list is empty, returns { "author": null, "likes": 0 }', () => {
    const result = listHelper.mostLikes([])
    expect(result.author).toBe(null)
    expect(result.likes).toBe(0)
  })

  test(
    'when list has only one blog, returns { "author": blog.author, "blogs": blog.likes }',
    () => {
      const result = listHelper.mostLikes(listWithOneBlog)
      expect(result.author).toBe(listWithOneBlog[0].author)
      expect(result.likes).toBe(listWithOneBlog[0].likes)
    }
  )

  test('when list has many blogs, returns the expected object', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result.author).toBe('Edsger W. Dijkstra')
    expect(result.likes).toBe(17)
  })
})
