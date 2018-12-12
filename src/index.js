const fs = require('fs')
const https = require('https')
const morgan = require('morgan')
const express = require('express')
const {log} = require('./lib/util.js')
const cookieParser = require('cookie-parser')

const state = {
  app: express(),
  isOn: false,
  httpsOptions: {
    key: fs.readFileSync(process.env.KEY_PATH),
    cert: fs.readFileSync(process.env.CERT_PATH),
  },
  http: null,
}

state.app.use(morgan('common'))
state.app.use(cookieParser(process.env.SECRET))
state.app.use(require('./lib/router-middleware.js'))
state.app.use(express.static(`${__dirname}/public`))

module.exports = {
  start: () => {
    return new Promise((resolve, reject) => {
      if(state.isOn) return reject(new Error('__SERVER_ALREADY_ON__'))
      state.http = https.createServer(state.httpsOptions, state.app).listen(process.env.PORT, (err) => {
        if(err) return reject(err)
        log('__SLUGNETBOT_SERVER_UP__', process.env.PORT)
        state.isOn = true
        resolve(state)
      })
    })
  },
  stop: () => {
    return new Promise((resolve, reject) => {
      if(!state.isOn) return reject('__SERVER_ALREADY_OFF__')
      state.http.close((err) => {
        if(err) return reject(err)
        log('__SLUGNETBOT_SERVER_DOWN__')
        state.http = null
        state.isOn = false
        resolve(state)
      })
    })
  },
}
