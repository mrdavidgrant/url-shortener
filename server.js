var express = require('express')
const morgan = require('morgan')
const bodyParser = require("body-parser");
const urlDatabase = require('./urlDatabase')
var methodOverride = require('method-override')
var app = express()

var PORT = process.env.PORT || 8080

app.set('view engine', 'ejs')

app.use(methodOverride('_method'))
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.redirect('/urls')
})

app.get('/urls', (req, res) => {
  let data = urlDatabase.getAll()
  res.render('urls_index', {url  :data})
})

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.post("/urls", (req, res) => {
  let id = urlDatabase.addPair(req.body.longURL).short
  res.redirect(`/urls/${id}`);   
});

app.get("/u/:id", (req, res) => {
  let url = urlDatabase.getSingle(req.params.id)
  res.status(307).redirect(url.long)
})

app.get("/urls/:id", (req, res) => {
  // console.log(req.params.id)
  let url = urlDatabase.getSingle(req.params.id)
  res.render('urls_show', {url: url})
})

app.delete('/urls/:id/', (req, res) =>{
  urlDatabase.deletePair(req.params.id)
  res.redirect('/urls')
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})



