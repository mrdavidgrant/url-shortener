const apps = require('./apps')
const bcrypt = require('bcrypt')

const users = {
  yBYShb4N: { 
    id: 'yBYShb4N',
    email: 'mrdavidgrant@outlook.com',
    password: '$2a$10$FYv/e39jGblFduKsrEwxn.iXkdv2T7N1HRmXgNnz.41Ju7s1.uMNq' 
  }
}

// Function to add user
function addUser (email, password) {
  let id = apps.random(8)
  users[id] = {
    id: id,
    email: email,
    password: bcrypt.hashSync(password, 10)
  }
  return users[id]
}

// Function to verify input on registration page
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

// Function to return single user from DB
function getUser (userInfo) {
  for (id in users) {
    if (users[id].id == userInfo || users[id].email == userInfo) {
      return users[id]
      break
    }
  }
  return false
}

// Function to authenticate login
function verifyUser (email, password) {
  let user = getUser(email)
  if (user && bcrypt.compareSync(password, user.password)) {
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