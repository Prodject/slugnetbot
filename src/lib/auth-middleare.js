const os = require('os')
const ms = require('ms')
const bcrypt = require('bcrypt')
const util = require('./util.js')
const jwt = require('jsonwebtoken')
const jsonparser = require('body-parser').json()

const interfaces = os.networkInterfaces()
const netBotClientID = new Buffer(Object.keys(interfaces).map(x => x + '=' + interfaces[x][0].mac)
  .filter(s => !s.endsWith('00:00:00:00:00:00')).join()).toString('base64')

module.exports = {
  createToken: (req, res, next) => {
    return jsonparser(req, res, (err) => {
      if(err) return next(err)
      return bcrypt.compare(req.body.password, process.env.PASSHASH)
      .then(success => {
        if(!success) throw new Error('401 unauthorized bad password')
        return jwt.sign({data: netBotClientID}, process.env.SECRET, {expiresIn: '30m'})
      })
      .then(token => {
        res.set('X-Slugnetbot-Client', netBotClientID)
        res.set('X-Slugnetbot-Token', token)
        res.cookie( 'X-Slugnetbot-Token', token, {maxAge: ms('30m'), secure: true, signed: true, sameSite: true})
        next()
      })
      .catch(next)
    })
  },
  verifyToken: (req, res, next) => {
    let authHeader = req.headers.Authorization
    if(!authHeader) return next(new Error('401 unauthorized no Auth Header'))
    let token = authHeader.split(' ')[1]
    if(!token)
      token = req.signedCookies['X-Slugnetbot-Client']
    if(!token) return next(new Error('401 unauthorized no token'))

    return jwt.verify(token, process.env.SECRET) 
    .then(decoded => {
      if(decoded.data != netBotClientID) throw new Error('401 unauthorized no Auth Header')
      res.set('X-Slugnetbot-Client', netBotClientID)
      next()
    })
    .catch(next)
  },
}
