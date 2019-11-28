const express = require('express')
const GroupSchema = require('../models/group.model')

const router = express.Router()

/* List of groups */
router.get('/groups', (req, res) => {
  GroupSchema.find()
    .then((groups) => res.json(groups))
    .catch((err) => res.status(400).json('Error: ' + err))
})

/* Create new group */
router.post('/group/add', (req, res) => {
  if (!req.body) {
    res.status(400).send('Request body is missing')
  }

  const group = new GroupSchema(req.body)
  group
    .save()
    .then((doc) => {
      res.status(201).send(doc)
    })
    .catch((err) => {
      res.status(500).json(err)
    })
})

module.exports = router
