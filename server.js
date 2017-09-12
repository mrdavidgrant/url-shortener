var express = require('express')
var app = express()
var PORT = process.env.PORT || 8080

app.set('view engine', 'ejs')

var urlDatabase = [
  {short: "b2xVn2",
    long: "http://www.lighthouselabs.ca"},
  {short: "9sm5xK",
    long: "http://www.google.com"}
]


app.use(function(req, res, next) {
  console.log(`New Request: ${req.method} ${req.url}`)
  // console.log(req)
  next()
})

app.get('/', (req, res) => {
  res.end('Hello!')
})

app.get('/urls', (req, res) => {
  
  res.render('urls_index', {urls: urlDatabase})
  
})

app.get("/urls/:id", (req, res) => {
  // console.log(req.params)
  const url = urlDatabase.filter((url) => {
    return url.short == req.params.id
  })[0]
  // console.log(url)
  res.render('urls_show', {
    short: url.short,
    long: url.long
  })
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})