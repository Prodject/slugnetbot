const bcrypt = require('bcrypt')

process.env.PORT=4444
process.env.DEBUG=true
process.env.CERT_PATH =`${__dirname}/certs/cert.pem`
process.env.KEY_PATH =`${__dirname}/certs/key.pem`
process.env.SECRET='fake secret'
process.env.TESTPASS = new Buffer(Math.random()).toString('base-64')
process.env.PASSHASH = bcrypt.hashSync(process.env.TESTPASS, 10)
