const totalLikes = (blogs) => {
  let totalLikes = 0

  for (const blog of blogs) {
    totalLikes += blog.likes
  }

  return totalLikes
}

const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null
  }

  const favoriteBlog = blogs.reduce((a, b) => a.likes > b.likes ? a : b)

  return favoriteBlog
}

const mostBlogs = (blogs) => {
  const ret = {
    author: null,
    blogs: 0
  }

  if (!blogs || blogs.length === 0) {
    return ret
  }

  const map = new Map()
  for (const blog of blogs) {
    if (map.has(blog.author)) {
      map.set(blog.author, map.get(blog.author) + 1)
    } else {
      map.set(blog.author, 1)
    }
  }

  for (const [author, blogs] of map.entries()) {
    if (blogs > ret.blogs) {
      ret.blogs = blogs
      ret.author = author
    }
  }

  return ret
}

const mostLikes = (blogs) => {
  const ret = {
    author: null,
    likes: 0
  }

  if (!blogs || blogs.length === 0) {
    return ret
  }

  const map = new Map()
  for (const blog of blogs) {
    if (map.has(blog.author)) {
      map.set(blog.author, map.get(blog.author) + blog.likes)
    } else {
      map.set(blog.author, blog.likes)
    }
  }

  for (const [author, likes] of map.entries()) {
    if (likes > ret.likes) {
      ret.likes = likes
      ret.author = author
    }
  }

  return ret
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
