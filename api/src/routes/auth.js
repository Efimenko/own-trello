const crypto = require('crypto')
const express = require('express')
const jwt = require('jsonwebtoken')

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
        const token = jwt.sign({_id: user._id}, process.env.SECRET_KEY)
        res.header('Authorization', `Bearer ${token}`)
        res.sendStatus(200)
      } else {
        res.status(401).send('Unauthorized')
      }
    })
    .catch((err) => res.status(400).json(err))
})

router.post('/register', (req, res) => {
  const hashedPassword = crypto
    .createHash('md5')
    .update(process.env.SECRET_KEY + ':' + req.body.password)
    .digest('hex')
  const user = new UserSchema({...req.body, password: hashedPassword})
  user
    .save()
    .then((newUser) => {
      const token = jwt.sign({_id: newUser._id}, process.env.SECRET_KEY)
      res.header('Authorization', `Bearer ${token}`)
      res.status(200)
    })
    .catch((err) => {
      res.status(500).json(err)
    })
})

module.exports = router
