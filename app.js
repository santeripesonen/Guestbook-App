const express = require('express');
const path = require('path');
const cors = require("cors")
const fs = require("fs");
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
app.use(cors())
// for parsing application/json
app.use(bodyParser.json()); 
app.use(express.static('Assets'));
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 

// Define the home page route


app.get('/messages', (req, res) => {
  const messages = JSON.parse(fs.readFileSync("./messagedata.json", {encoding: "utf8"}))
  res.json(messages)
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/Assets/index.html'));
});

// Define the guestbook page route
app.get('/guestbook', (req, res) => {
  res.sendFile(path.join(__dirname, '/Assets/guestbook.html'));
});

// Define the new message page route
app.get('/newmessage', (req, res) => {
  res.sendFile(path.join(__dirname, '/Assets/newmessage.html'))
});

app.post('/newmessage', (req, res) => {
  const {username, country, message} = req.body
  const messages = JSON.parse(fs.readFileSync("./messagedata.json", {encoding: "utf8"}))
  const date = Date.now()
  messages.push({id: messages[messages.length-1].id + 1, username, country, message, date })

  fs.writeFileSync("./messagedata.json", JSON.stringify(messages), null, 4)

  res.sendFile(path.join(__dirname, '/Assets/sentmessage.html'))
});

app.get('/ajaxmessage', (req, res) => {
  res.sendFile(path.join(__dirname, '/Assets/ajaxmessage.html'))
});

app.post('/ajaxmessage', (req, res) => {
  const {username, country, message} = req.body
  console.log("kana", req.body)
  const messages = JSON.parse(fs.readFileSync("./messagedata.json", {encoding: "utf8"}))
  const date = Date.now()
  messages.push({id: messages[messages.length-1].id + 1, username, country, message, date })

  fs.writeFileSync("./messagedata.json", JSON.stringify(messages), null, 4)

  res.json({message: "Message received"})
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

/*
Tee sivut: index.html, guestbook.html ja ajaxmessage.html
index.html sisältö: sisältää navigaatiolinkit muihin sivuihin
guestbook.html: näyttää olemassa olevat viestit
ajaxmessage.html: sama kuin newmessage mutta lähetyslogiikka eri

*/