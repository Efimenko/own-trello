const express = require('express')

const verifyToken = require('./middlewares/verify-token')
const {task} = require('../services/task')

const router = express.Router()

/* List of tasks */
router.get('/tasks', verifyToken, (req, res) => {
  const {userId} = req
  task.getAll({userId}).then(({status, data}) => res.status(status).send(data))
})

/* Get task by id */
router.get('/task/:_id', verifyToken, (req, res) => {
  const {
    userId,
    params: {_id},
  } = req
  task
    .getOne({_id, userId})
    .then(({status, data}) => res.status(status).send(data))
})

/* Create new task */
router.post('/task/add', verifyToken, (req, res) => {
  const {
    body: {parent, description, title},
    userId,
  } = req
  task.add({parent, title, description, userId}).then(({status, data}) => {
    res.status(status).send(data)
  })
})

/* Edit task */
router.post('/task/update/:_id', verifyToken, (req, res) => {
  const {
    body: {title, description},
    params: {_id},
    userId,
  } = req
  task.update({_id, userId, title, description}).then(({status, data}) => {
    res.status(status).send(data)
  })
})

/* Delete task by id */
router.delete('/task/remove/:_id', verifyToken, (req, res) => {
  const {
    params: {_id},
    userId,
  } = req
  task.remove({_id, userId}).then(({status, data}) => {
    res.status(status).send(data)
  })
})

module.exports = router
