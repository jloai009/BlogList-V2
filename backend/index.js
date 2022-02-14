const app = require('./app')
const http = require('http')
const PORT = require('./utils/config').PORT
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
