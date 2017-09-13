const apps = require('./apps')

const users = {}

function addUser (email, password) {
  let id = apps.random(8)
  users[id] = {
    id: id,
    email: email,
    password: password
  }
  return users[id]
}

module.exports = {
  addUser: addUser
}