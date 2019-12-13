const express = require('express')
const TaskSchema = require('../models/task.model')
const logger = require('../logger')
const verifyToken = require('./verifyToken')

const router = express.Router()

/* List of tasks */
router.get('/tasks', verifyToken, (req, res) => {
  TaskSchema.find({owner: req.userId})
    .then((tasks) => res.json(tasks))
    .catch((err) => res.status(400).json('Error: ' + err))
})

/* Get task by id */
router.get('/task/:id', verifyToken, (req, res) => {
  TaskSchema.findById({_id: req.params.id, owner: req.userId})
    .then((task) => res.json(task))
    .catch((err) => res.status(400).json('Error: ' + err))
})

/* Create new task */
router.post('/task/add', verifyToken, (req, res) => {
  const task = new TaskSchema({...req.body, owner: req.userId})
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

/* Edit task */
router.post('/task/update/:id', verifyToken, (req, res) => {
  const {title, description} = req.body
  TaskSchema.updateOne(
    {_id: req.params.id, owner: req.userId},
    {$set: {title, description}}
  )
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json('Error: ' + err))
})

/* Delete task by id */
router.delete('/task/remove/:id', verifyToken, (req, res) => {
  TaskSchema.deleteOne({_id: req.params.id, owner: req.userId})
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json('Error: ' + err))
})

module.exports = router
