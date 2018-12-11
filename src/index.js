const express = require('express')
const {log} = require('./lib/util.js')

const state = {
  app: express(),
  isOn: false,
  http: null,
}

state.app.use(express.static(`${__dirname}/public`))

module.exports = {
  start: () => {
    return new Promise((resolve, reject) => {
      if(state.isOn) return reject(new Error('__SERVER_ALREADY_ON__'))
      state.http = state.app.listen(process.env.PORT, (err) => {
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
        state.isOn = false
        resolve(state)
      })
    })
  },
}
