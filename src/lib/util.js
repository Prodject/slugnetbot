// LOG if process.env.DEBUG is truty 
const log = (...args) => !!process.env.DEBUG ? console.log(...args) : undefined

// turn a async callback function into a promise
const promisify = (fn) => (...args) => 
  new Promise((resolve, reject) => fn(...args, (err, data) => err ? reject(err) : resolve(data)))

module.exports = {
  log, 
  promisify,
}
