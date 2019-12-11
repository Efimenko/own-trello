const crypto = require('crypto')
const express = require('express')
const UserSchema = require('../models/user.model')

const router = express.Router()

router.post('/login', (req, res) => {
  const hashedPassword = crypto
    .createHash('md5')
    .update(process.env.SECRET_KEY + ':' + req.body.password)
    .digest('hex')

  UserSchema.findOne({email: req.body.email, password: hashedPassword})
    .then((user) => {
      if (user) {
        res.status(200).send('Login')
      } else {
        res.status(401).send('Unauthorized')
      }
    })
    .catch((err) => res.status(400).json('Error: ' + err))
})

router.post('/register', (req, res) => {
  const hashedPassword = crypto
    .createHash('md5')
    .update(process.env.SECRET_KEY + ':' + req.body.password)
    .digest('hex')
  const user = new UserSchema({...req.body, password: hashedPassword})
  user
    .save()
    .then((doc) => {
      res.status(201).send(doc)
    })
    .catch((err) => {
      res.status(500).json(err)
    })
})

module.exports = router
