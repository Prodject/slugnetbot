#!/usr/bin/env node
const bcrypt = require('bcrypt')
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stderr
});

readline.question('What is your new password? ', (password) => {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      if(err) {
        console.error(err)
        process.exit(-1)
      } else {
        console.log(hash)
        readline.close()
      }
    });
  });
})
