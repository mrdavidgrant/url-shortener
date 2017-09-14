const apps = require('./apps')

let urlDatabase = {
  'b2xVn2': {
    short: 'b2xVn2',
    user: 'yBYShb4N',
    long: "http://www.lighthouselabs.ca",
    visited: 0,
    visitedBy: [],
    visits: [],
  },
  '9sm5xK': {
    short: '9sm5xK',
    user: 'yBYShb4N',
    long: "http://www.google.com",
    visited: 0,
    visitedBy: [],
    visits: []
  }
}

// Return all DB urls
function getAll(user) {
  return urlDatabase
}

// add URL pair
function addPair (user, url) {
  key = apps.random(6)
  urlDatabase[key] = {
    short: key,
    long: url,
    user: user,
    visited: 0,
    visitedBy: [],
    visits: []
  }
  return key
}

// edit pair
function editPair (id, long) {
  urlDatabase[id].long = long
  return getSingle(id)
}

// delete a pair
function deletePair (id) {
  delete urlDatabase[id]
  return true
}

// return a single URL information
function getSingle(info) {
  let url = {}
  for (key in urlDatabase) {
    if (key == info || urlDatabase[key] === info) {
      url = urlDatabase[key]
      break
    }
  }
  return url
}

// Analytics
function track (url, uid) {
  urlDatabase[url.short].visited++
  if (!urlDatabase[url.short].visitedBy.includes(uid)) {
    urlDatabase[url.short].visitedBy.push(uid)
  }
  let visit = [uid, Date().toString()]
  urlDatabase[url.short].visits.push(visit)
  return
}

module.exports = {
  getAll: getAll,
  addPair: addPair,
  editPair: editPair,
  deletePair: deletePair,
  getSingle: getSingle,
  track:track
}