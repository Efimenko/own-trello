const crypto = require('crypto')
const express = require('express')
const jwt = require('jsonwebtoken')

const UserSchema = require('../models/user.model')
const {omit} = require('../utils')

const router = express.Router()

router.post('/user/login', (req, res) => {
  const hashedPassword = crypto
    .createHash('md5')
    .update(process.env.SECRET_KEY + ':' + req.body.password)
    .digest('hex')

  UserSchema.findOne({email: req.body.email, password: hashedPassword})
    .then((user) => {
      if (user) {
        const token = jwt.sign({_id: user._id}, process.env.SECRET_KEY)
        res.header('Authorization', `Bearer ${token}`)
        res.status(200).send(omit(['password'])(user))
      } else {
        res.status(401).send('Unauthorized')
      }
    })
    .catch((err) => res.status(400).json(err))
})

router.post('/user/loginbytoken', (req, res) => {
  const {_id} = jwt.decode(req.body.token)

  UserSchema.findOne({_id})
    .then((user) => {
      if (user) {
        res.status(200).send(omit(['password'])(user))
      } else {
        res.status(401).send('Unauthorized')
      }
    })
    .catch((err) => res.status(400).json(err))
})

router.post('/user/register', (req, res) => {
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
      res.status(200).send(omit(['password'])(newUser))
    })
    .catch((err) => {
      res.status(500).json(err)
    })
})

module.exports = router
