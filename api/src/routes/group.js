const express = require('express')

const {verifyToken} = require('./middlewares')
const {group} = require('../services/group')

const router = express.Router()

/* List of groups */
router.get('/groups', verifyToken, (req, res) => {
  const {userId} = req
  group.getAll({userId}).then(({status, data}) => {
    res.status(status).send(data)
  })
})

/* Create new group */
router.post('/group/add', verifyToken, (req, res) => {
  const {
    body: {title},
    userId,
  } = req
  group.add({title, userId}).then(({status, data}) => {
    res.status(status).send(data)
  })
})

module.exports = router
