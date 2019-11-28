const express = require('express')
const bodyParser = require('body-parser')

const taskRouter = require('./routes/task')

/* Initiate express app */
const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
  console.log(
    `${new Date().toString()}: Request: ${
      req.originalUrl
    } Body: ${JSON.stringify(req.body)}`
  )
  next()
})

app.use(taskRouter)

/* Return 404 status when there is not some route */
app.use((req, res) => {
  res.status(404).send('404 not fount')
})

/* Return 500 status when some error happened */
app.use((err, req, res) => {
  console.error(err.stack)
  res.status(500).send('Internal server error')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`API running on ${PORT} port`))
