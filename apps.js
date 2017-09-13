

function generateRandomString(x) {
  var mask = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var result = '';
  for (var i = x; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
  return result;
}

module.exports = {
  random: generateRandomString
}