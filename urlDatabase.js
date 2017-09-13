const apps = require('./apps')

let urlDatabase = {
  "b2xVn2":"http://www.lighthouselabs.ca",
  "9sm5xK":"http://www.google.com"
}

function getAll() {
  return urlDatabase
}

function addPair (url) {
  key = apps.random(6)
  urlDatabase[key] = url
  return getSingle(key)
}

function editPair (id, long) {
  urlDatabase[id] = long
  return getSingle(id)
}

function deletePair (id) {
  delete urlDatabase[id]
  return true
}

function getSingle(id) {
  let url = {}
  for (key in urlDatabase) {
    if (key == id) {
      url.short = key
      url.long = urlDatabase[key]
      break
    }
  }
  return url
}

module.exports = {
  getAll : getAll,
  addPair : addPair,
  editPair : editPair,
  deletePair : deletePair,
  getSingle : getSingle
}