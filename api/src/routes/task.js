const express = require('express')
const TaskSchema = require('../models/task.model')
const logger = require('../logger')

const router = express.Router()

/* List of tasks */
router.get('/tasks', (req, res) => {
  TaskSchema.find()
    .then((tasks) => res.json(tasks))
    .catch((err) => res.status(400).json('Error: ' + err))
})

/* Get tasks by id */
router.get('/task/:id', (req, res) => {
  TaskSchema.findById({_id: req.params.id})
    .then((task) => res.json(task))
    .catch((err) => res.status(400).json('Error: ' + err))
})

/* Create new task */
router.post('/task/add', (req, res) => {
  const task = new TaskSchema(req.body)
  task
    .save()
    .then((doc) => {
      res.status(201).send(doc)
    })
    .catch((err) => {
      logger.error({err: err.stack})
      res.status(500).json(err)
    })
})

module.exports = router
