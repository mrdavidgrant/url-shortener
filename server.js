`use strict`
const express = require('express')
let morgan = require('morgan')
const bodyParser = require("body-parser");
const urlDatabase = require('./urlDatabase')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const userDB = require('./userDB')

const app = express()

const PORT = process.env.PORT || 8080

app.set('view engine', 'ejs')

app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use((req, res, next) => { 
  req.user = req.cookies.user_id
  next() 
}) 
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.redirect('/urls')
})

app.get('/urls', (req, res) => {
  let data = urlDatabase.getAll()
  res.render('urls_index', {url: data, user: req.user})
})

app.get("/urls/new", (req, res) => {
  res.render("urls_new", {user: req.user});
});

app.post("/urls", (req, res) => {
  let id = urlDatabase.addPair(req.body.longURL).short
  res.redirect(`/urls/${id}`);   
});

app.get("/u/:id", (req, res) => {
  let url = urlDatabase.getSingle(req.params.id)
  res.status(307).redirect(url.long)
})

app.get("/urls/:id/edit", (req, res) => {
  // console.log(req.params.id)
  let url = urlDatabase.getSingle(req.params.id)
  res.render('urls_edit', {url: url, user: req.user})
})

app.patch('/urls/:id', (req, res) => {
  urlDatabase.editPair(req.params.id, req.body.longURL)
  res.redirect('/urls/:id')
})

app.get("/urls/:id", (req, res) => {
  // console.log(req.params.id)
  let url = urlDatabase.getSingle(req.params.id)
  res.render('urls_show', {url: url, user: req.user})
})

app.delete('/urls/:id/', (req, res) =>{
  urlDatabase.deletePair(req.params.id)
  res.redirect('/urls')
})

app.post('/login', (req, res) => {
  res.cookie('username', req.body.username)
  res.redirect('/urls')
})

app.post('/logout', (req, res) => {
  res.clearCookie('user_id', req.cookies.user_id)
  res.redirect('/urls')
})

app.get('/register', (req, res) => {
  res.render('register', {user: req.user})
})

app.post('/register', (req, res) => {
  let verified = userDB.verify(req.body.email, req.body.password)
  console.log(verified)
  if (verified[0] != 200) {
    res.status(verified[0]).send(verified[1])
  } else {
    id = userDB.addUser(req.body.email, req.body.password)
    console.log('ID Created:', id.email)
    res.cookie('user_id', id.id)
    res.redirect('/urls')
  }
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})



