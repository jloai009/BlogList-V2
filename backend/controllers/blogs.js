const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = new Blog(request.body)
  const user = request.user

  blog.user = user._id.toString()
  user.blogs = user.blogs.concat(blog._id)
  await User.findOneAndUpdate({ _id: user._id }, { blogs: user.blogs })

  let result = await blog.save()
  result = await result.populate('user', { username: 1, name: 1 })

  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  let user = request.user
  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() !== user._id.toString()) {
    return response.status(401).json({ error: 'no permission to delete blog' })
  }

  user = await User.findById(user._id.toString())
  user.blogs = user.blogs.filter((id) => id.toString() !== request.params.id)

  await User.findOneAndUpdate({ _id: user._id }, { blogs: user.blogs })
  await Blog.findByIdAndDelete(request.params.id)

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true }
  ).populate('user', { username: 1, name: 1 })

  response.json(updatedBlog)
})

blogsRouter.patch('/like/:id', async (request, response) => {
  const blogToLike = await Blog.findById(request.params.id)
  blogToLike.likes++
  await blogToLike.save()
  response.status(204).end()
})

module.exports = blogsRouter
