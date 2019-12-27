const express = require('express')

const {auth} = require('../services/auth')
const {validateData} = require('./validate-data')
const {userValidationSchema} = require('../validator/user')

const router = express.Router()

router.post('/user/login', (req, res) => {
  const {email, password} = req.body
  auth.login({email, password}).then(({status, data, token}) => {
    if (status === 200) {
      res.header('Authorization', `Bearer ${token}`)
    }
    res.status(status).send(data)
  })
})

router.post('/user/loginbytoken', (req, res) => {
  const {token} = req.body
  auth.loginByToken({token}).then(({status, data}) => {
    res.status(status).send(data)
  })
})

router.post(
  '/user/register',
  validateData(userValidationSchema.add),
  (req, res) => {
    const {name, email, password} = req.body
    auth.register({name, email, password}).then(({status, token, data}) => {
      if (status === 201) {
        res.header('Authorization', `Bearer ${token}`)
      }
      res.status(status).send(data)
    })
  }
)

module.exports = router
