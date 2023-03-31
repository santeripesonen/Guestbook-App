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

app.get('/messages', (req, res) => {
  // returns messages in json form to guestbook
  const messages = JSON.parse(fs.readFileSync("./messagedata.json", {encoding: "utf8"}))
  res.json(messages)
})

app.get('/', (req, res) => {
  // returns frontpage file
    res.sendFile(path.join(__dirname, '/Assets/index.html'));
});

app.get('/guestbook', (req, res) => {
  // returns guestbook file
  res.sendFile(path.join(__dirname, '/Assets/guestbook.html'));
});

app.get('/newmessage', (req, res) => {
  // returns new message form
  res.sendFile(path.join(__dirname, '/Assets/newmessage.html'))
});

app.post('/newmessage', (req, res) => {
  // receives a post request and creates a new message
  // reads the data from the request
  const {username, country, message} = req.body
  const messages = JSON.parse(fs.readFileSync("./messagedata.json", {encoding: "utf8"}))
  const date = Date.now()
  // add new message to list
  messages.push({id: messages[messages.length-1].id + 1, username, country, message, date })

  //writes the updated messagelist to json file
  fs.writeFileSync("./messagedata.json", JSON.stringify(messages), null, 4)

  // returns success page
  res.sendFile(path.join(__dirname, '/Assets/sentmessage.html'))
});

app.get('/ajaxmessage', (req, res) => {
  // returns ajaxmessage page
  res.sendFile(path.join(__dirname, '/Assets/ajaxmessage.html'))
});

app.post('/ajaxmessage', (req, res) => {
  // receives a post request and creates a new message
  // reads the data from the request
  const {username, country, message} = req.body
  const messages = JSON.parse(fs.readFileSync("./messagedata.json", {encoding: "utf8"}))
  const date = Date.now()

   // add new message to list
  messages.push({id: messages[messages.length-1].id + 1, username, country, message, date })

  //writes the updated messagelist to json file
  fs.writeFileSync("./messagedata.json", JSON.stringify(messages), null, 4)

  // returns json with the updated list
  res.json({messages: messages})
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
