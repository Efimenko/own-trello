const express = require('express')

const GroupSchema = require('../models/group.model')
const verifyToken = require('./verifyToken')

const router = express.Router()

/* List of groups */
router.get('/groups', verifyToken, (req, res) => {
  GroupSchema.find({owner: req.userId})
    .then((groups) => res.json(groups))
    .catch((err) => res.status(400).json('Error: ' + err))
})

/* Create new group */
router.post('/group/add', verifyToken, (req, res) => {
  const group = new GroupSchema({...req.body, owner: req.userId})
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
