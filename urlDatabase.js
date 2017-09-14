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

function getAll(user) {
  return urlDatabase
}

function addPair (user, url) {
  console.log(`User: ${user}, URL ${url}`)
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
      url = urlDatabase[key]
      break
    }
  }
  return url
}

function track (url, uid) {
  urlDatabase[url.short].visited++
  if (!urlDatabase[url.short].visitedBy.includes(uid)) {
    urlDatabase[url.short].visitedBy.push(uid)
  }
  let visit = [uid, Date().toString()]
  urlDatabase[url.short].visits.push(visit)
  console.log(`Tracked! Visited by ${urlDatabase[url.short].visitedBy} for ${urlDatabase[url.short].visited} total visits`)
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