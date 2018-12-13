const router = require('express').Router()
const {createToken, checkToken} = require('./auth-middleare.js')

router.post('/api/auth', createToken, (req, res, next) => {
  res.send()
})

module.exports = router

