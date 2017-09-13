var urlDatabase = {
  "b2xVn2":"http://www.lighthouselabs.ca",
  "9sm5xK":"http://www.google.com"
}

function getAll() {
  return urlDatabase
}

function addPair (url) {
  key = generateRandomString()
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

function generateRandomString() {
  var mask = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var result = '';
  for (var i = 6; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
  return result;
}

module.exports = {
  getAll : getAll,
  addPair : addPair,
  editPair : editPair,
  deletePair : deletePair,
  getSingle : getSingle
}