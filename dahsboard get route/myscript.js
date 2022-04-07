var express = require('express');
var app = express();

app.get('/', function (req, res) {
  // res.render("login", {layout : );
  res.render("main");
});

// Da Main Boi
app.get('/dashboard', function (req, res) {
  // res.render("dashboard", {layout : ""});
  res.render("dashboard");
});

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

// app.get("/login", (req, res) => {
//   //Serves the body of the page aka “main.handlebars” to the container //aka “index.handlebars”
//   res.render("login", {layout : ""});
//   });

app.listen(8000, function () {
  console.log('Listening to Port 8000');
});

