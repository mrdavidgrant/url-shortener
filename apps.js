
// function to generate random string
function generateRandomString(x) {
  const mask = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = x; i > 0; --i) {
    result += mask[Math.floor(Math.random() * mask.length)]
  }
  return result
}

module.exports = {
  random: generateRandomString
}