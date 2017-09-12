var express = require('express')
var app = express()
const bodyParser = require("body-parser");
var PORT = process.env.PORT || 8080

app.set('view engine', 'ejs')

var urlDatabase = {
  "b2xVn2":"http://www.lighthouselabs.ca",
  "9sm5xK":"http://www.google.com"
}

app.use(function(req, res, next) {
  console.log(`New Request: ${req.method} ${req.url}`)
  // console.log(req)
  next()
})

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.end('Hello!')
})

app.get('/urls', (req, res) => {
  res.render('urls_index', {url  :urlDatabase})
})

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.post("/urls", (req, res) => {
  console.log(req.body);  // debug statement to see POST parameters

  res.send(`Ok => ${req.body.longURL}`);   
});

app.get("/urls/:id", (req, res) => {
  // console.log(urlDatabase)
  let url = {}
  for (key in urlDatabase) {
    if (key == req.params.id) {
      url.key = key
      url.actual = urlDatabase[key]
      console.log(url)
    }
  }
  res.render('urls_show', {
    short: url.key,
    long: url.actual
  })
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})

function generateRandomString() {
  var mask = '';
  if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
  if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (chars.indexOf('#') > -1) mask += '0123456789';
  if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
  var result = '';
  for (var i = 6; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
  return result;
  }