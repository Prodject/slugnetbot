const server = require('../index.js')

describe('testing server interface', () => {
  it('serer.start start the server on process.env.PORT', () => {
    return server.start().then((state) => {
      expect(state.isOn).toBe(true) 
    })
  })

  it('serer.start should return a promise', () => {
    return server.stop().then((state) => {
      expect(state.isOn).toBe(false) 
    })
  })
})
