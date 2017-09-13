const apps = require('./apps')

const users = {
  RODNFT4X:
  { id: 'RODNFT4X',
    email: 'mrdavidgrant@outlook.com',
    password: 'asdf' }
}

function addUser (email, password) {
  let id = apps.random(8)
  users[id] = {
    id: id,
    email: email,
    password: password
  }
  return users[id]
}

function verify (email, password) {
  if (!email || !password) {
    return [400, 'Please enter valid email and password']
  }
  for (let id in users) {
    if (users[id].email == email){
      return [400, `User with email ${email} already exists`]
      break
    }
  }
  return [200]
}

module.exports = {
  addUser: addUser,
  verify: verify
}