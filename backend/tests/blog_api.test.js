const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.listWithBlogs)
})

let token = null
beforeAll(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()

  const response = await api
    .post('/api/login')
    .send({ username: 'root', password: 'sekret' })
  token = response.body.token
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned with GET', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.listWithBlogs.length)
})

test('all blogs have an id property', async () => {
  const response = await api.get('/api/blogs')
  for (const blog of response.body) {
    expect(blog.id).toBeDefined()
  }
})

test('POST request creates a new blog', async () => {
  const newBlog = {
    title: 'Hello World',
    author: 'Jose',
    url: 'Test',
    likes: 3
  }

  await api
    .post('/api/blogs')
    .set('Authorization', 'bearer ' + token)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  let blogs = await Blog.find({})
  blogs = blogs.map(blog => blog.toJSON())

  expect(blogs).toHaveLength(helper.listWithBlogs.length + 1)

  const titles = blogs.map(n => n.title)

  expect(titles).toContain(
    'Hello World'
  )
})

test('POST request fails when unauthorized', async () => {
  const newBlog = {
    title: 'Hello World',
    author: 'Jose',
    url: 'Test',
    likes: 3
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)

  let blogs = await Blog.find({})
  blogs = blogs.map(blog => blog.toJSON())

  expect(blogs).toHaveLength(helper.listWithBlogs.length)
})

test('The likes property of a blog a default of 0', async () => {
  const newBlog = {
    title: 'Hello World',
    author: 'Jose',
    url: 'Test'
  }

  const response = await api
    .post('/api/blogs')
    .set('Authorization', 'bearer ' + token)
    .send(newBlog)

  expect(response.body.likes).toBe(0)
})

test('blog without title is not added', async () => {
  const newBlog = {
    author: 'Jose',
    url: 'Test'
  }

  await api
    .post('/api/blogs')
    .set('Authorization', 'bearer ' + token)
    .send(newBlog)
    .expect(400)

  let blogs = await Blog.find({})
  blogs = blogs.map(blog => blog.toJSON())

  expect(blogs).toHaveLength(helper.listWithBlogs.length)
})

test('blog without url is not added', async () => {
  const newBlog = {
    title: 'Hello World',
    author: 'Jose',
    likes: 3
  }

  await api
    .post('/api/blogs')
    .set('Authorization', 'bearer ' + token)
    .send(newBlog)
    .expect(400)

  let blogs = await Blog.find({})
  blogs = blogs.map(blog => blog.toJSON())

  expect(blogs).toHaveLength(helper.listWithBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})
