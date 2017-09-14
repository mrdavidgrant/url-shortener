const apps = require('./apps')

let urlDatabase = {
  'b2xVn2': {
    short: 'b2xVn2',
    user: 'RODNFT4X',
    long: "http://www.lighthouselabs.ca"
  },
  '9sm5xK': {
    short: '9sm5xK',
    user: 'RODNFT4X',
    long: "http://www.google.com"
  }
}

function getAll() {
  return urlDatabase
}

function addPair (user, url) {
  console.log(`User: ${user}, URL ${url}`)
  key = apps.random(6)
  urlDatabase[key] = {
    short: key,
    long: url,
    user: user
  }
  return key
}

function editPair (id, long) {
  urlDatabase[id].long = long
  return getSingle(id)
}

function deletePair (id) {
  delete urlDatabase[id]
  return true
}

function getSingle(info) {
  let url = {}
  for (key in urlDatabase) {
    if (key == info || urlDatabase[key] === info) {
      url.short = key
      url.long = urlDatabase[key].long
      break
    }
  }
  console.log(url)
  return url
}

module.exports = {
  getAll : getAll,
  addPair : addPair,
  editPair : editPair,
  deletePair : deletePair,
  getSingle : getSingle
}