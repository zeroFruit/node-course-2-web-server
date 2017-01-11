const express = require('express');
const fs = require('fs');

var app = express();

/* Middlewares */
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});
app.get('/', (req, res) => {
  res.send('Hello express');
});

app.get('/bad', (req, res) => {
  res.json({
    errorMessage: 'error'
  })
});
app.listen(3000);
