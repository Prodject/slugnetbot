const fs = require('fs')
const server = require('../index.js')
const request = require('superagent')

const ca = fs.readFileSync(`${__dirname}/certs/client-cert.pem`)
//const cert = fs.readFileSync(process.env.CERT_PATH)
//const key = fs.readFileSync(process.env.KEY_PATH)

describe('testing server auth', () => {
  beforeAll(server.start)
  afterAll(server.stop)

  describe('testing POST /api/auth', () => {
    it('a corect password should 401', () => {
      return request(process.env.API_URL + '/api/auth')
      .ca(ca)
      .send({password: process.env.TEMPPASS})
      .then(res => {
        expect(res.status).toBe(200)
        expect(res.headers['X-Slugnetbot-Token']).toBeTruthy()
        expect(res.headers['X-Slugnetbot-Client']).toBeTruthy()
      })
    })
  })
})
