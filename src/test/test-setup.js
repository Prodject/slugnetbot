const bcrypt = require('bcrypt')

process.env.PORT=4444
process.env.DEBUG='true'
process.env.SECRET='fake secret'
process.env.API_URL='https://localhost:4444'
process.env.CERT_PATH =`${__dirname}/certs/server-test.cert`
process.env.KEY_PATH =`${__dirname}/certs/server-test.key`
process.env.TESTPASS = new Buffer(Math.random()).toString('base-64')
process.env.PASSHASH = bcrypt.hashSync(process.env.TESTPASS, 10)
