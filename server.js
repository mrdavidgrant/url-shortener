var express = require('express')
var app = express()
var PORT = process.env.PORT || 8080

app.set('view engine', 'ejs')

var urlDatabase = [
  { 
    short:"b2xVn2",
    long: "http://www.lighthouselabs.ca"
  },
  {
    short:"9sm5xK",
    long: "http://www.google.com"
  }
]

app.get('/', (req, res) => {
  res.end('Hello!')
})

app.get('/urls', (req, res) => {
  let templateVars = {urls: urlDatabase}
  res.render('urls_index', templateVars)
})



app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})