const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const taskRouter = require('./routes/task')
const groupRouter = require('./routes/group')
const authRouter = require('./routes/auth')
const {logger, reqResLogger} = require('./logger')

const result = dotenv.config()

if (result.error) {
  logger.error({err: result.error})
} else {
  logger.info('.env file successful initialized')
}

mongoose.connect(
  'mongodb://localhost:27017/trello',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => logger.info('Connected to MongoDB')
)

/* Initiate express app */
const app = express()

app.use(express.json())

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:1234')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Accept, Authorization'
  )
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE')
  res.header('Access-Control-Expose-Headers', '*')
  next()
})

app.use(reqResLogger)

app.use(taskRouter)
app.use(groupRouter)
app.use(authRouter)

/* Return 404 status when there is not some route */
app.use((req, res) => {
  res.status(404).send('404 not fount')
})

/* Return 500 status when some error happened */
app.use((err, req, res) => {
  logger.error({err: err.stack})
  res.status(500).send('Internal server error')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => logger.info(`API running on ${PORT} port`))
