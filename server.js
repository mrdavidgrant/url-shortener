'use strict'

const express = require('express')
let morgan = require('morgan')
const bodyParser = require("body-parser");
const urlDatabase = require('./urlDatabase')
const methodOverride = require('method-override')
const cookieSession = require('cookie-session')
const userDB = require('./userDB')
const apps = require('./apps')

const app = express()

const PORT = process.env.PORT || 8080

app.set('view engine', 'ejs')

app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieSession({
  name: 'user_id',
  keys: ['asdlfiv vsagfjsahfvakjsdfhsnkvdjgnhskdglsvdhngsdgh bsdlkfghsvnaslkfdjvhngsdkghsdngvksdhn', 'asfdlkjfsahsadfas'],
}))
app.use(cookieSession({
  name: 'uid',
  keys: ['asdlfiv vsagfjsahfvakjsdfhsnkvdjgnhskdglsvdhngsdgh bsdlkfghsvnaslkfdjvhngsdkghsdngvksdhn', 'asfdlkjfsahsadfas'],
}))
app.use(function (req, res, next) {
  if (req.path === '/login' || req.path === '/register' || req.path.startsWith('/u/')) {
    if (req.session.uid) {
      req.uid = req.session.uid
    } else {
      req.uid = apps.random(10)
      req.session.uid = req.uid
    }
    next()
    return
  }
  if (req.session.uid) {
    req.uid = req.session.uid
  } else {
    req.uid = apps.random(10)
    req.session.uid = req.uid
  }
  const currentUser = req.session.user_id
  console.log(currentUser)
  if (currentUser) {
    req.user = userDB.getUser(currentUser)
    next()
  } else {
    req.user = 0
    res.redirect('/login')
  }
}) 
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.redirect('/urls')
})

app.get('/login', (req, res) => {
  res.render('login', {user: req.user})
})

app.get('/urls', (req, res) => {
  let data = urlDatabase.getAll(req.user)
  res.render('urls_index', {url: data, user: req.user})
})

app.get("/urls/new", (req, res) => {
  res.render("urls_new", {user: req.user});
});

app.get("/u/:id", (req, res) => {
  let url = urlDatabase.getSingle(req.params.id)
  urlDatabase.track(url, req.uid)
  res.status(307).redirect(url.long)
})

app.get("/:id/edit", (req, res) => {
  // console.log(req.params.id)
  let url = urlDatabase.getSingle(req.params.id)
  res.render('urls_edit', {url: url, user: req.user})
})

app.get("/urls/:id", (req, res) => {
  // console.log(`key ${req.key}`)
  let url = urlDatabase.getSingle(req.params.id)
  console.log(url)
  res.render('urls_show', {url: url, user: req.user})
})

app.get('/register', (req, res) => {
  res.render('register', {user: req.user})
})

app.patch('/urls/:id', (req, res) => {
  urlDatabase.editPair(req.params.id, req.body.longURL)
  res.redirect('/urls/:id')
})

app.post("/urls", (req, res) => {
  if (req.user != 0){
    // console.log(req.body)
    key = urlDatabase.addPair(req.user.id, req.body.longURL)
    // console.log(`req.key now = ${req.params.id}`)
    res.redirect(`/urls/${key}`);   
  } else {
    res.redirect('/login')
  }
})

app.post('/login', (req, res) => {
  if (userDB.verifyUser(req.body.email, req.body.password)) {
    let user = userDB.getUser(req.body.email)
    req.session.user_id = user.id
    res.redirect('/urls')
  } else {
    res.redirect('/login')
  }
})

app.post('/logout', (req, res) => {
  req.session = null
  res.redirect('/urls')
})

app.post('/register', (req, res) => {
  let verified = userDB.verify(req.body.email, req.body.password)
  if (verified[0] != 200) {
    res.status(verified[0]).send(verified[1])
  } else {
    let id = userDB.addUser(req.body.email, req.body.password)
    console.log('ID Created:', id.email)
    req.session.user_id = id.id
    res.redirect('/urls')
  }
})

app.delete('/urls/:id/', (req, res) =>{
  urlDatabase.deletePair(req.params.id)
  res.redirect('/urls')
})




app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})



