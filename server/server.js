var express = require('express');
var app = express();
var path = require('path');
// var mongoose = require('mongoose');
// var users = require('./routes/users');
// var beers = require('./routes/beers');
// var passport = require('passport');

// app.use(passport.initialize());

// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   next();
// });

// app.use('/user', users);
// app.use('/beers', beers);

// mongoose.connect(process.env.BEER_CELLAR_MONGODB);

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.get('/', function(request, response) {
  response.json('We\'re up and running!');
});

app.listen(process.env.PORT || 9000);
console.log('Listening on port 9000...');
