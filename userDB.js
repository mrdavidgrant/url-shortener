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

function getUser (userInfo) {
  for (id in users) {
    if (users[id].id == userInfo || users[id].email == userInfo) {
      return users[id]
      break
    }
  }
  return false
}

function verifyUser (email, password) {
  let user = getUser(email)
  // console.log(user)
  if (user && user.password === password) {
    return true
  } else {
    return false
  }
}

module.exports = {
  addUser: addUser,
  verify: verify,
  getUser: getUser,
  verifyUser: verifyUser
}