const express = require('express')
const TaskSchema = require('../models/task.model')

const router = express.Router()

/* Create new task */
router.post('/task', (req, res) => {
  if (!req.body) {
    res.status(400).send('Request body is missing')
  }

  const task = new TaskSchema(req.body)
  task
    .save()
    .then((doc) => {
      if (!doc || doc.length === 0) {
        res.status(500).send(doc)
      }

      res.status(201).send(doc)
    })
    .catch((err) => {
      res.status(500).json(err)
    })
})

module.exports = router
